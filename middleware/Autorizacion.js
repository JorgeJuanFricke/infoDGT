const jwt = require("jsonwebtoken");
const app = require("../app");

exports.esAutenticado = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('No autenticado.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('No autenticado.');
    error.statusCode = 401;
    throw error;
  }
  app.currentUser = decodedToken.email;
  next();
    
};

exports.esAutorizadoAñadir = (req, res, next) => {
   
    if (req.usuario.admin) {
        next();
    } 
    else if (req.usuario.oi && req.body.tipo.permiso == "OI") {
        next();
    }
    else if (req.usuario.oat && req.body.tipo.permiso == "OAT") {
        next();
    }    
    else {
        const error = new Error('No autorizado.');
        error.statusCode = 403;
        throw error;
       
    }    
   
};




exports.esAutorizadoEditar = async (req, res, next) => {
   if (req.body.autor == req.usuario.email || req.usuario.admin) {
        next();
    } else {
        const error = new Error("No autorizado.");
        error.statusCode = 422;
        throw error;

    }

};



exports.esAdmin = async (req, res, next) => {
   
    if (req.usuario.admin) {
        next();
    } else {
        const error = new Error("No autorizado.");
        error.statusCode = 422;
        throw error;

    }

};