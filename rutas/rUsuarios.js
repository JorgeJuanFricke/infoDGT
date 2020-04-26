const express = require("express");
const {
  body
} = require("express-validator/check");

const Usuario = require("../modelos/mUsuario");
const cUsuarios = require("../controladores/cUsuarios");
const Auto = require("../middleware/Autorizacion");

const usuariosRouter = express.Router();





usuariosRouter.post("/login", cUsuarios.login);






usuariosRouter.get("/logout", function (req, res) {

});


//usuariosRouter.get('/login', cUsuarios.getLogin);

//usuariosRouter.get('/signup', cUsuarios.getSignup);

usuariosRouter.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  cUsuarios.login
);



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



//usuariosRouter.post('/logout', cUsuarios.postLogout);

//usuariosRouter.get('/reset', cUsuarios.getReset);

//usuariosRouter.post('/reset', cUsuarios.postReset);

//usuariosRouter.get('/reset/:token', cUsuarios.getNewPassword);

//usuariosRouter.post('/new-password', cUsuarios.postNewPassword);



module.exports = usuariosRouter;
