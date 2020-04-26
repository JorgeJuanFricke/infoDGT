const express = require('express');
const cAdmin = require('../controladores/cAdmin');
const adminRouter = express.Router();


adminRouter.get('/usuario/:id', function (req, res, next) {
    cAdmin.getUsuario(req, res, next);
});


adminRouter.patch('/usuario/:id', function (req, res, next) {
    cAdmin.updateUsuario(req, res, next);
});



module.exports = adminRouter;