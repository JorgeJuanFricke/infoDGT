const jwt = require("jsonwebtoken");
const app = require("../app");
const Usuario = require("../modelos/mUsuario");
const Tipo = require("../modelos/mTipo");




exports.esAutenticado = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('No autenticado.');
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
  
    decodedToken = jwt.verify(token, 'primersabadocuarentena');
 
    if (!decodedToken) {
      const error = new Error('No autenticado.');
      error.statusCode = 401;
      throw error;
    }
    app.currentUser = decodedToken.email;
    req.email = decodedToken.email;
 
    next();
    
  }
  catch (error) {
    next (error);
  }
};







exports.esUsuario = async (req, res, next) => {
  try {
    usuario = await Usuario.findOne({email: app.currentUser});
  
    if (usuario.admin) {
        next();
    } 
    else if (usuario.email === app.currentUser) {
        next();
    }
  
    else {
        const error = new Error('No autorizado.');
        error.statusCode = 403;
        throw error;
      
    }  
  }
  catch (error) {
    next(error);
  } 
 
};



exports.esAutorizadoAñadir = async (req, res, next) => {
   try {
      let usuario = await Usuario.findOne({email: app.currentUser});
      let tipo = await Tipo.findById(req.body.tipo); 
     
    
      if (usuario._doc.admin) {
          next();
      } 
      else if (usuario._doc.oi && tipo.permisos.indexOf("OI")) {
          next();
      }
      else if (usuario._doc.oat && tipo.permisos.indexOf("OAT")) {
          next();
      }    
      else {
          const error = new Error('No autorizado.');
          error.statusCode = 403;
          throw error;
        
      }  
    }
    catch (error) {
      next(error);
    } 
   
};




exports.esAutorizadoEditar = async (req, res, next) => {
  try {
    usuario = await Usuario.findOne({email: app.currentUser});
  
    if (usuario.admin) {
        next();
    } 
    else if (usuario.email === req.body.autor) {
        next();
    }
   
    else {
        const error = new Error('No autorizado.');
        error.statusCode = 403;
        throw error;
      
    }  
  }
  catch (error) {
    next(error);
  } 
 
};




exports.esAdmin = async (req, res, next) => {
  try {
    usuario = await Usuario.findOne({email: app.currentUser});
  
    if (usuario.admin) {
        next();
    }
   
    else {
        const error = new Error('No autorizado.');
        error.statusCode = 403;
        throw error;
      
    }  
  }
  catch (error) {
    next(error);
  } 
 
};
