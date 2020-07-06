const express = require('express');
const Recurso = require('../modelos/mRecurso');

const recursosRouter = express.Router();

const cRecursos = require('../controladores/cRecursos');
const Auto = require('../middleware/Autorizacion');
const {body, validationResult} = require('express-validator');





VALIDAPUT = [
    body('tipo').trim().exists().not().isEmpty().withMessage("debe seleccionar el tipo"),
    body('nombre').trim().exists().not().isEmpty().withMessage("debe introducir el nombre"),
    body('url').isURL({require_protocol:false, require_host:false}).withMessage("debe introducir la url válida para el documento"),
    body('procedencia').optional().not().isEmpty().withMessage("debe introducir la procedencia"),
    body('publicacion').exists().not().isEmpty().withMessage("debe introducir fecha publicación")
  
];

VALIDAPOST = [
    
    body('nombre').trim().exists().not().isEmpty().withMessage("debe introducir el nombre"),
    body('url').isURL({require_protocol: false, require_host:false}).withMessage("debe introducir la url válida para el documento"),
    body('procedencia').optional().not().isEmpty().withMessage("debe introducir la procedencia"),
    body('publicacion').exists().not().isEmpty().withMessage("debe introducir fecha publicación")
  
];



/*** RECURSO general **************************************/

recursosRouter.get('/', Auto.esAutenticado, function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/:Id', Auto.esAutenticado, function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.put(
    '/', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDAPUT,
        function (req, res, next) {
    cRecursos.putRecurso(req, res, next);
});




recursosRouter.post('/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDAPOST, function (req, res, next) {
    cRecursos.postRecurso(req, res, next);
});



recursosRouter.delete('/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar,
 function (req, res, next) {
    cRecursos.deleteRecurso(req, res, next);
});




module.exports = recursosRouter;