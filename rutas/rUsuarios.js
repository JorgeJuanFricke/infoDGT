const express = require("express");
const {
  body
} = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const Auto = require("../middleware/Autorizacion");

const usuariosRouter = express.Router();


VALIDAUSUARIO = [
    
  body('nombre').trim().exists().not().isEmpty().withMessage("debe introducir el nombre"),
  body('email').trim().isEmail().withMessage("debe introducir un email válido"),
 
];


usuariosRouter.get('/:email', function (req, res, next) {
  cUsuarios.getUsuario(req, res, next);
});



usuariosRouter.post('/', Auto.esAdmin, VALIDAUSUARIO, function (req, res, next) {
  cUsuarios.updateUsuario(req, res, next);
});


usuariosRouter.post('/reset', cUsuarios.resetPassword);


usuariosRouter.get("/logout", function (req, res) {

});


//usuariosRouter.get('/login', cUsuarios.getLogin);

//usuariosRouter.get('/signup', cUsuarios.getSignup);

usuariosRouter.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('no es un email válido.')
      .normalizeEmail(),
    body('password', 'La contraseña ha de ser de 5 caracteres mínimo y alfanumérica.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  cUsuarios.login
);


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


//usuariosRouter.post('/logout', cUsuarios.postLogout);

//usuariosRouter.get('/reset', cUsuarios.getReset);

//usuariosRouter.post('/reset', cUsuarios.postReset);

//usuariosRouter.get('/reset/:token', cUsuarios.getNewPassword);

//usuariosRouter.post('/new-password', cUsuarios.postNewPassword);



module.exports = usuariosRouter;
