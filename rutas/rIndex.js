const express = require('express');
const Index = require('../controladores/cIndex');
const Auto = require('../middleware/Autorizacion');
const cUsuarios = require('../controladores/cUsuarios');

const indexRouter = express.Router();

indexRouter.get('/tiposUsuario', Auto.esAutenticado, (req, res, next) => Index.getListaTiposUsuario(req, res, next));

indexRouter.get('/tipos', (req, res, next) => Index.getListaTipos(req, res, next));

indexRouter.get('/categorias', (req, res, next) => Index.getCategorias(req, res, next));

indexRouter.get('/recursos', (req, res, next) => Index.getRecursos(req, res, next));


indexRouter.get('/autenticado', Auto.esAutenticado, (req, res, next) => {
    Index.getUsuarioActual(req, res, next);
});




indexRouter.get('/', (req, res, next) => Index.renderPagina(req, res, next) );


indexRouter.get('/about', (req, res) => function (req, res) {

    return res.render('vAbout', {
        hola: 'hola'
    });
});

module.exports = indexRouter;