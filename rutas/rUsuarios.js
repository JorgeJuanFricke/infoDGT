const express = require("express");
const {
  body
} = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const Auto = require("../middleware/Autorizacion");
const { trim } = require("jquery");

const usuariosRouter = express.Router();


VALIDAUSUARIO = [
    
  body('nombre').trim().exists().not().isEmpty().withMessage("debe introducir el nombre"),
  body('email').trim().isEmail().withMessage("debe introducir un email válido")
 
];

VALIDALOGIN = [
  body('email').trim().isEmail().withMessage("debe introducir un email válido"), 
  body('password').trim().exists().not().isEmpty().withMessage("debe introducir la password")

 
];
usuariosRouter.get('/:email', function (req, res, next) {
  cUsuarios.getUsuario(req, res, next);
});



usuariosRouter.post('/', Auto.esAutenticado, Auto.esAdmin, VALIDAUSUARIO, function (req, res, next) {
  cUsuarios.updateUsuario(req, res, next);
});


usuariosRouter.post('/reset', Auto.esAutenticado, Auto.esUsuario, VALIDALOGIN, function (req, res, next) {
  cUsuarios.resetPassword(req, res, next);
});


usuariosRouter.get("/logout", function (req, res) {

});



usuariosRouter.post('/login', VALIDALOGIN, function (req, res, next) {
  cUsuarios.login(req, res, next);
  });
  




module.exports = usuariosRouter;
