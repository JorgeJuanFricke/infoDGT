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



VALIDATEXTO = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('url').not().isEmpty().withMessage("debe introducir la url del documento"),
    body('descripcion').not().isEmpty().withMessage("debe introducir una descripción"),

    sanitizeBody('nombre').escape(),
    sanitizeBody('url').escape(),
];


VALIDANORMA = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('descripcion').not().isEmpty().withMessage("debe introducir una descripción"),
    body('codBOE').not().isEmpty().withMessage("debe introducir el código del BOE"),
    sanitizeBody('nombre').escape(),
    sanitizeBody('codBOE').escape(),

];

VALIDA = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),

    sanitizeBody('nombre').escape(),
];


VALIDAIMPORTE = [
    body('nombre').not().isEmpty().withMessage("debe introducir un nombre"),
    body('euros').not().isEmpty().withMessage("debe introducir un importe"),
    sanitizeBody('nombre').escape(),
];



/*** RECURSO general **************************************/

recursosRouter.get('/recurso', Auto.esAutenticado, function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.get('/recurso/:Id', Auto.esAutenticado, function (req, res, next) {
    cRecursos.getRecurso(req, res, next);
});


recursosRouter.put(
    '/recurso', 
    Auto.esAutenticado, 
    Auto.esAutorizadoAñadir, 
    VALIDA, function (req, res, next) {
    cRecursos.putRecurso(req, res, next);
});

recursosRouter.post('/recurso:Id', Auto.esAutenticado, Auto.esAutorizadoEditar, VALIDA, function (req, res, next) {
    cRecursos.updateRecurso(req, res, next);
});







module.exports = recursosRouter;