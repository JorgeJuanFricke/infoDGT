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


usuariosRouter.post('/reset', VALIDALOGIN, function (req, res, next) {
  cUsuarios.resetPassword(req, res, next);
});


usuariosRouter.get("/logout", function (req, res) {

});



usuariosRouter.post('/login', VALIDALOGIN, function (req, res, next) {
  cUsuarios.login(req, res, next);
  });
  

/*
usuariosRouter.post( '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address if forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  cUsuarios.signup
);
*/




module.exports = usuariosRouter;
