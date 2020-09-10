const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const nodemailer = require('nodemailer');
//const sendgridTransport = require('nodemailer-sendgrid-transport');
const {
  validationResult
} = require('express-validator/check');

const Usuario = require('../modelos/mUsuario');
const app = require('../app');

/*
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

*/






exports.resetPassword = async(req, res, next) => {

  let email = req.body.email;
  
  const errors = validationResult(req);
  const listaErrores = errors.errors;

  try {

        if (!errors.isEmpty()) {
          let msgErrores = listaErrores.map(e => {return e.msg});
          const error = new Error(msgErrores.join(","));
          error.statusCode = 422;
          throw error;
        
        };

  
      
        const usuario = await Usuario.findOne({
          email: email
        });
        
        if (!usuario) {
          const error = new Error(`el usuario con email:${email} no existe`);
          error.statusCode = 401;
          throw error;
        }
        usuario.password = req.body.password;
        
        let resultado = await usuario.save();
  
      return res.status(200).json({ message: 'contraseña modificada!', usuario: resultado });
    

  } catch(err) {
      if (!err.statusCode) {
      err.statusCode = 500;
      }
      next(err);
    
  }
  
};





exports.updateUsuario = async (req, res, next) => {

 
  
  const errors = validationResult(req);
  const listaErrores = errors.errors;
  
  try {

      if (!errors.isEmpty()) {
        let msgErrores = listaErrores.map(e => {return e.msg});
        const error = new Error(msgErrores.join(","));
        error.statusCode = 422;
        throw error;
      };

    let update = req.body;
    
    const opts = { new: true, upsert: true };

    let resultado = await Usuario.findOneAndUpdate({email:req.body.email}, update, opts);
   
       
    return res.status(200).json({ message: 'usuario modificado!', usuario: resultado });
    
  }
  catch (error) {
     
      next(error);
  
  } 

};








exports.login = async (req, res, next) => {
  
  const errors = validationResult(req);
  const listaErrores = errors.errors;

  try {

      if (!errors.isEmpty()) {
        let msgErrores = listaErrores.map(e => {return e.msg});
        const error = new Error(msgErrores.join(","));
        error.statusCode = 422;
        throw error;
       };

     
      const email = req.body.email;
      const password = req.body.password;
  
      const usuario = await Usuario.findOne({
        email: email
      });
      if (!usuario) {
        const error = new Error(`el usuario con email:${email} no existe`);
        error.statusCode = 401;
        throw error;
      }
   
     
      if (!usuario.password) {
        const error = new Error(`el usuario con email:${email} no tiene contraseña`);
        error.statusCode = 401;
        throw error;
      }

      const isEqual = await bcrypt.compare(password, usuario.password);
      if (!isEqual) {
        const error = new Error("password incorrecta!");
        error.statusCode = 401;
        throw error;
      }
    
      const token = jwt.sign({
          email: usuario.email,
          usuarioId: usuario._id.toString()
        
          
        },
        "primersabadocuarentena", {
          expiresIn: "5h"
        }
      );
    
      return res.status(200).json({
          token: token,
          usuario: usuario
        
        });
        
  } 
  catch (error) {
    
    next(error);
  }
};







