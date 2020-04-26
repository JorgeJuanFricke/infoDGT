const express = require('express');
const Index = require('../controladores/cIndex');


const indexRouter = express.Router();

indexRouter.get('/tipos', (req, res, next) => Index.getTipos(req, res, next));

indexRouter.get('/categorias', (req, res, next) => Index.getCategorias(req, res, next));

indexRouter.get('/listaRecursos', (req, res, next) => Index.getListaRecursos(req, res, next));




indexRouter.get('/', (req, res, next) => Index.renderPagina(req, res, next));


indexRouter.get('/about', (req, res) => function (req, res) {

    return res.render('vAbout', {
        hola: 'hola'
    });
});

module.exports = indexRouter;