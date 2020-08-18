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


exports.getUsuario = async(req, res, next) => {
  try {
    let usuario = await Usuario.findOne(req.email);
    if (!usuario) {
      const error = new Error("Usuario no encontrado.");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: 'usuario encontrado.', usuario: usuario });
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




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
      
  
    
        
      let result = await Usuario.updateOne({email:email}, {$set:{password: req.body.passwword}});
    
      return res.status(200).json({ message: 'contraseña modificada!', usuario: result });
    

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

   
    const email = req.body.email
    const nombre = req.body.nombre;
    const admin = req.body.admin;
    const oi = req.body.oi;
    const oat = req.body.oat;

    let update = {
     
      nombre: nombre,
      admin: admin,
      oi: oi,
      oat: oat
    };
  
    let resultado = await Usuario.findOneAndUpdate({email:email}, update, {upsert:true, new: true})
  
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
      //UsuarioOK = usuario;
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







