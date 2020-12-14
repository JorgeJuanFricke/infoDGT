const express = require('express');
const Recurso = require('../modelos/mRecurso');

const crypto = require("crypto");
const mime = require("mime-types");


const recursosRouter = express.Router();

const cRecursos = require('../controladores/cRecursos');
const Auto = require('../middleware/Autorizacion');
const {body, validationResult} = require('express-validator');
const multer= require('multer');

var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype))
      })
    }
  })
  
  var upload = multer({ storage: storage })
  





VALIDAPUT = [
    body('tipo').trim().exists().not().isEmpty().withMessage("debe seleccionar el tipo"),
    body('nombre').trim().exists().not().isEmpty().withMessage("debe introducir el nombre"),
    body('procedencia').optional().not().isEmpty().withMessage("debe introducir la procedencia"),
    body('publicacion').exists().not().isEmpty().withMessage("debe introducir fecha publicación")
  
];

VALIDAPOST = [
    
    body('nombre').trim().exists().not().isEmpty().withMessage("debe introducir el nombre"),
    body('procedencia').optional().not().isEmpty().withMessage("debe introducir la procedencia"),
    body('publicacion').exists().not().isEmpty().withMessage("debe introducir fecha publicación")
  
];

recursosRouter.post('/documento', Auto.esAutenticado,  upload.single('documento'), 
    function (req, res, next) {
        return res.json(req.file);
  });


recursosRouter.post('/lista', function (req, res, next) {
    cRecursos.getListaRecursosIds(req, res, next);
});


recursosRouter.get('/',  function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/:Id', function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});



recursosRouter.put(
    '/', Auto.esAutenticado, Auto.esAutorizadoAñadir, VALIDAPUT,
        function (req, res, next) {
    cRecursos.putRecurso(req, res, next);
});




recursosRouter.post('/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDAPOST, function (req, res, next) {
    cRecursos.postRecurso(req, res, next);
});



recursosRouter.delete('/:Id', Auto.esAutenticado, Auto.esAdmin,
 function (req, res, next) {
    cRecursos.deleteRecurso(req, res, next);
});




module.exports = recursosRouter;