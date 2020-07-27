const crypto = require('crypto');
const bcrypt = require('bcryptjs');
//const nodemailer = require('nodemailer');
//const sendgridTransport = require('nodemailer-sendgrid-transport');
const {
  validationResult
} = require('express-validator/check');

const Usuario = require('../modelos/mUsuario');

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
  let Password = req.body.password;


  try {
 
    const hashedPassword = await bcrypt.hash(Password, 12);
  
      
    let result = await Usuario.updateOne({email:email}, {$set:{password: hashedPassword}});
  
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

  if (!errors.isEmpty()) {
    const error = new Error('validación fallida.');
    error.message ='validación fallida';
    error.data = errors.array();
    return res.status(299).json(error);
  };

  
  
  try {
   
    const email = req.body.email
    const nombre = req.body.nombre;
    const admin = req.body.admin;
    const oi = req.body.oi;
    const oat = req.body.oat;

    let usuario = {};
      //email: email,
      usuario.nombre = nombre;
      usuario.admin = admin;
      usuario.oi =  oi;
      usuario.oat =  oat;
      
  
    let result = await Usuario.findOneAndUpdate({email:email}, usuario, {upsert:true})
  
    return res.status(200).json({ message: 'usuario modificado!', usuario: result });
    
  }
  catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  
  } 

};








exports.login = async (req, res, next) => {
  // JWT
  
   
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('validación fallida.');
    error.message ='validación fallida';
    error.data = errors.array();
    return res.status(299).json(error);
  };
  
  const email = req.body.email;
  const password = req.body.password;
  try {
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
        expiresIn: "1h"
      }
    );
    res
      .status(200)
      .json({
        token: token,
        usuarioId: loadedUser._id.toString()
      });
      
  } 
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};







