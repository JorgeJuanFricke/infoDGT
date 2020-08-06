const mongoose = require('mongoose');
const fs = require("fs");
const Tipo = require('../modelos/mTipo.js');
const Recurso = require('../modelos/mRecurso.js');
const async = require("async");
const app = require("../app");
const Usuario = require('../modelos/mUsuario');


const {
    validationResult
} = require('express-validator/check');
const R = require('ramda');





exports.getListaTipos = async (req,res,next) => {
    // dar los tipos a los que puede añadir 
    let permisos = [];
    try {
        let usuario = await Usuario.findOne({email: app.currentUser});
  
        if (usuario._doc.admin) {
            permisos.push('ADMIN');
        } 
        if (usuario._doc.oat) {
            permisos.push('OAT');
        }
        if (usuario._doc.oi) {
            permisos.push('OI');
        } 
       if(permisos.length > 0) {
            let tipos = await Tipo.find({permisos: {$all: permisos }}, {codigo: 1  })
            .sort('codigo').lean();
            let listaTipos = tipos.map(function (tipo) {
                return {id: tipo._id, text:tipo.codigo}
            });
            return res.json(listaTipos);
       } else {
            const error = new Error('El usuario no tiene ningún permiso');
            error.statusCode = 401;
            throw error;
           
       }

       
    }
    catch (error) {
       
        next(error);
    }   

}




exports.getRecursos = async (req, res, next) => {
    const paginaActual = req.query.pagina || 1;
    const recursosPorPagina = 10;
    // necesito limites y pagina
    let texto = req.query.texto;
        
       try {
        let recursos = await Recurso.find({ 
            $text : { 
                $search : texto
            } 
        },
        { score:{$meta:'textScore'} })
        .sort({ score : { $meta : 'textScore' } })
        .populate('tipo')
        .exec();

        let totalRecursos =  await Recurso.find({ 
            $text : { 
                $search : texto
            } 
        }).countDocuments();

       res.status(200).json({
         message: 'página de recursos cargados correctamente!!.',
         recursos: recursos,
         totalRecursos: totalRecursos
       });
   } catch (error) {
    
     next(error);
   }
 };



exports.renderPagina = async (req, res, next) => {
   
     
        return res.sendFile(__dirname + '/public/index.html');


    
};



/*
  
       let query = [
         
              
                {$match:  { $text: { $search: texto, $language: "es" }}} ,
                {$sort: { score: { $meta: "textScore" } } },
                
        
           {
               $lookup: {
                   from: 'tipos',
                   localField: 'tipo',
                   foreignField: 'codigo',
                   as: 'tipo'
               }
           },
           {
               $unwind: '$tipo'
           }
       ];
         let totalRecursos = await Recurso.countDocuments(query2);
       let recursos =  await Recurso.aggregate(query2) 
            .skip((paginaActual - 1) * recursosPorPagina)
            .limit(recursosPorPagina).exec();

            */
