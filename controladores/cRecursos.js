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
const {
    validationResult
} = require('express-validator/check');
const R = require('ramda');







exports.getRecursos = async (req, res, next) => {
     const currentPage = req.query.page || 1;
     const perPage = 2;
     // necesito limites y pagina
     try {
        let tipo = req.query.tipo;
        
        let query = [
          {
                $match: {
                    categoria: req.query.categoria,
                    tipo: req.query.tipo
                }
            },
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
        let totalRecursos = await Recurso.aggregate(query).countDocuments();
        let recursos = await Recurso.aggregate(query)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
        res.status(200).json({
          message: 'página de recursos cargados correctamente!!.',
          recursos: recursos,
          totalItems: totalItems
        });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };



exports.getRecurso = async (req, res, next) => {
    let query = [{
          $match: {
              _id: mongoose.Types.ObjectId(req.params.id)
          }
      },
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
    ]
    try {
      let recurso = await Recurso.aggregate().exec();
      if (!recurso) {
        const error = new Error('El recurso no existe');
        error.statusCode = 404;
        throw error;
      }
      let enlaces = await enlaces.find({sujeto: recurso._id});
      let referencias = await enlaces.find({objeto: recurso._id});
      if (enlaces) {recurso.enlaces = enlaces};
      if (referencias) {recurso.referencias = referencias};
      res.status(200).json({ message: 'recurso encontrado.', recurso: recurso });
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
      error.statusCode = 422;
      error.data = errors;
      throw error;
    }
    if (recurso.tipo === 'Norma') {
        recurso = validaLeyBOE(req.body.codBOE);
    }
    const recurso = new Recurso(req.body);
    recurso.actualizadoPor = req.user.email;
    //Object.assign(recurso, req.body);
    

    try {
        await recurso.save();
        
        res.status(201).json({
          message: 'recurso creado!',
          recurso: recurso,
          
        });
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
};
     
 



exports.postRecurso = async (req, res, next) => {
    const recursoId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      error.data = errors;
      throw error;
    }
   try {
      const recurso = await Recurso.findById(recursoId);
      if (!recurso) {
        const error = new Error('El recurso no existe');
        error.statusCode = 404;
        throw error;
      }
      Object.assign(recurso, req.body);
    
      recurso.actualizadoPor = req.user.email;
      
      const result = await recurso.save();
      res.status(200).json({ message: 'recurso modificado!', recurso: result });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };




  
  exports.deletePost = async (req, res, next) => {
    const recursoId = req.params.id;
    try {
      const recurso = await Recurso.findById(recursoId);
  
      if (!recurso) {
        const error = new Error('El recurso no existe');
        error.statusCode = 404;
        throw error;
      }
     
      await Recurso.findByIdAndRemove(recursoId);
  
      
      res.status(200).json({ message: 'recurso borrado.' });
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
  