const mongoose = require('mongoose');
const Tipo = require('../modelos/mTipo.js');
const Recurso = require('../modelos/mRecurso.js');
let config = require('../configuracion.js');
const d3 = require("d3");
const fetch = require('node-fetch');
const rp = require('request-promise');
const $ = require('cheerio');
const xml2js = require('xml2js');
const parseString = require('xml2js').parseString;
const moment = require('moment');

const {
    validationResult
} = require('express-validator/check');

const R = require('ramda');
const recursosRouter = require('../rutas/rRecursos.js');







exports.getRecurso = async (req, res, next) => {
   
   const recursoId = req.params.Id;
    try {
      
      const recurso = await Recurso.findById(recursoId).populate('tipo');
      if (!recurso) {
        const error = new Error('El recurso no existe');
        error.statusCode = 404;
        throw error;
      }
     
      
      return res.status(200).json({ message: 'recurso encontrado.', recurso: recurso });
      
    } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
  };


  


exports.putRecurso = async (req, res, next) => {
  
     
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const error = new Error('validación fallida.');
      error.message ='validación fallida';
      error.data = errors.array();
      return res.status(299).json(error);
    }
    
  try {
    const tipo = req.body.tipo;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const url = req.body.url;
    const procedencia = req.body.procedencia;
    const publicacion = req.body.publicacion;
    const derogacion = req.body.derogacion;

    let recurso = new Recurso({
      tipo: tipo,
      nombre: nombre,
      descripcion: descripcion,
      url: url,
      procedencia:procedencia,
      publicacion:publicacion,
      derogacion:derogacion,
      oficina: '3502',
      autor: 'jjuan@dgt.es'

     
    });
     // oficina: config.Oficina
     //autor: req.user.email,
    
      await recurso.save()
  
         return res.status(201).json({
          message: 'recurso creado!',
          recurso: recurso,
          
        });
       
      
    } catch (err) {
      next(err);
    }
     
    
};
     
 



exports.postRecurso = async (req, res, next) => {
    const recursoId = req.params.Id;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors;
        throw error;
      }
   
      const recurso = await Recurso.findById(recursoId);

      if (!recurso) {
        const error = new Error('El recurso no existe');
        error.statusCode = 404;
        throw error;
      }
      recurso.nombre = req.body.nombre;
      recurso.descripcion = req.body.descripcion;
      recurso.url = req.body.url;
      recurso.procedencia = req.body.procedencia;
      recurso.publicacion = req.body.publicacion;
      recurso.derogacion = req.body.derogacion;
      /*
      if (req.body.derogacion) {
         recurso.derogacion = new Date(req.body.derogacion);}
         */
      recurso.actualizadoPor = 'jjuan@dgt.es';  // cambiar!!!!!!
      
      const result = await recurso.save();
      return res.status(200).json({ message: 'recurso modificado!', recurso: result });

    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };




  
  exports.deleteRecurso = async (req, res, next) => {
    const recursoId = req.params.Id;
    try {
      const recurso = await Recurso.findById(recursoId);
  
      if (!recurso) {
        const error = new Error('El recurso no existe');
        error.statusCode = 404;
        throw error;
      }
     
      await Recurso.findByIdAndRemove(recursoId);
  
      
      return res.status(200).json({ message: 'recurso borrado.' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };
  