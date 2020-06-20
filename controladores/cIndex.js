const mongoose = require('mongoose');
const fs = require("fs");
const Tipo = require('../modelos/mTipo.js');
const Recurso = require('../modelos/mRecurso.js');
const async = require("async");
const d3 = require("d3");

const {
    validationResult
} = require('express-validator/check');
const R = require('ramda');


exports.getTipos = async (req,res,next) => {
    try {

        let tipos = await Tipo.find({}, {codigo: 1 })
        .sort('codigo').lean();
        let results = tipos.map(function (tipo) {
            return {id: tipo._id, text:tipo.codigo}
        });
        return res.json({results: results});
    }
    catch (err) {
        if (!err.statusCode) {
         err.statusCode = 500;
        }
        next(err);
    }   

}






exports.getRecursos = async (req, res, next) => {
    const paginaActual = req.query.pagina || 1;
    const recursosPorPagina = 10;
    // necesito limites y pagina
    let tipo = req.query.tipo;
    let texto = req.query.texto;
    try {
     
       
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
       let totalRecursos = await Recurso.countDocuments(query);
       let recursos =  await Recurso.aggregate(query) 
            .skip((paginaActual - 1) * recursosPorPagina)
            .limit(recursosPorPagina).exec();
       /*
       let recursos = await Recurso.aggregate(query)
           .skip((paginaActual - 1) * recursosPorPagina)
           .limit(recursosPorPagina);
        */    
       res.status(200).json({
         message: 'página de recursos cargados correctamente!!.',
         recursos: recursos,
         totalRecursos: totalRecursos
       });
   } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   }
 };



exports.renderPagina = async (req, res, next) => {
    //updateTipos();
   
    try {
        //let tipos = JSON.parse(fs.readFileSync('./tipos.json'));
        //let categorias = JSON.parse(fs.readFileSync('./categorias.json'));
       
        return res.render('vIndex', {
           
            layout: null
        });


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}




