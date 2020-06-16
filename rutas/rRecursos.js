const express = require('express');
const Recurso = require('../modelos/mRecurso');

const recursosRouter = express.Router();

const cRecursos = require('../controladores/cRecursos');
const Auto = require('../middleware/Autorizacion');
const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');



VALIDA = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('url').not().isEmpty().withMessage("debe introducir la url del documento"),
    body('descripcion').not().isEmpty().withMessage("debe introducir una descripción"),
    body('euros').optional().not().isEmpty().withMessage("debe introducir un importe"),
    body('procedencia').optional().not().isEmpty().withMessage("debe introducir la procedencia"),
    body('publicacion').not().isEmpty().withMessage("debe introducir fecha publicación"),
    body('derogacion').optional().not().isEmpty().withMessage("debe introducir un importe"),
    sanitizeBody('nombre').escape(),
    sanitizeBody('url').escape(),
    sanitizeBody('descripcion').escape(),
    sanitizeBody('procedencia').escape()
   

];





/*** RECURSO general **************************************/

recursosRouter.get('/', Auto.esAutenticado, function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/:Id', Auto.esAutenticado, function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.put(
    '/', 
    Auto.esAutenticado, 
    Auto.esAutorizadoAñadir, 
    VALIDA, function (req, res, next) {
    cRecursos.putRecurso(req, res, next);
});




recursosRouter.post('/:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDA, function (req, res, next) {
    cRecursos.updateRecurso(req, res, next);
});







module.exports = recursosRouter;