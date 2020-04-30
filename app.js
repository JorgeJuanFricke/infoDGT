let config = require("./configuracion.js");
//const createError = require('http-errors');
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const exphbs = require("express-handlebars");
const app = express();
const ini = require("./controladores/cIni");

/**** directorios  ***************/
const fs = require("fs");
const dataDir = __dirname + "/upload";
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);

/*** logger **********************/

app.use(logger("combined"));

/*******  body parsers ****************/

const bodyParser = require("body-parser");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

/********* mongo ******************/
const env = require("dotenv").config();
console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
  case "desarrollo":
    try {
      db = mongoose.connect(config.desarrollo, {
        useNewUrlParser: true
      });
    } catch (error) {
      console.log(error);
    }
    break;

  case "produccion":
    try {
      db = mongoose.connect(config.produccion, {
        useNewUrlParser: true
      });
    } catch (error) {
      console.log(error);
    }
    break;

  default:
    throw new Error("entorno de ejecución desconocido: " + app.get("env"));
}


/****** express validator *****************/
const expressValidator = require("express-validator");
app.use(expressValidator());

/********** static ******************/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));

/********  handlebars ***********************/

var hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
  partialsDir: __dirname + "/views/partials/",
  layoutsDir: __dirname + "/views/layouts/",
  // Specify helpers which are only registered on this instance.
  helpers: {
    if_eq: function(a, b, opts) {
      if (a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
        
      }
    },
    margen: function(depth, options) {
      return "_".repeat(parseInt(depth));
    },
    espacio2Guion: function(frase, options) {
      return (frase = frase.replace(" ", "-"));
    }
  }
});

/*
app.engine('hbs', exphbs({
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/vistas/layouts/',
  helpers: {

    if_eq: function(a, b, opts) {
      if (a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
    margen: function (depth, options) {
      return "_".repeat(parseInt(depth));
    },
    espacio2Guion: function (frase, options) {
      return (frase = frase.replace(" ", "-"));
    }
}}));
*/

hbs.getPartials().then(function(partials) {
  console.log(partials);
  
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');





/*
hbs.registerHelper("if_Propietario", function(usuario, autor, opts) {
  if (usuario && (usuario.admin || usuario.email === autor)) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

hbs.registerHelper("if_admin", function(usuario, options) {
  if (usuario && usuario.admin) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("margen", (depth, options) => {
  return "_".repeat(parseInt(depth));
});

hbs.registerHelper("espacio2Guion", (frase, options) => {
  return (frase = frase.replace(" ", "-"));
});
*/

/*** usuario actual para handlebars *************/
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

const jqupload = require("jquery-file-upload-middleware");
app.use("/upload", function(req, res, next) {
  jqupload.fileHandler({
    uploadDir: function() {
      return config.upLoadDir;
    },
    uploadUrl: function() {
      return config.upLoadUrl;
    }
  })(req, res, next);

  // enviar json (con nombre y path)
});

/**** actualizar datos ******************/
ini.updateTipos();




/****** routers *************************/
const recursosRouter = require("./rutas/rRecursos.js");
const indexRouter = require("./rutas/rIndex.js");
const adminRouter = require("./rutas/rAdmin.js");
const usuariosRouter = require("./rutas/rUsuarios");

app.use("/recurso", recursosRouter);
app.use("/admin", adminRouter);
app.use("/usuario", usuariosRouter);
app.use("/", indexRouter);





/****** error 404 *******************/
app.use((req, res, next) => {
  const error = new Error('página no encontrada.');
  error.statusCode = 404;
  throw error;
});

/********  error 500 ***************/
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


module.exports = app;
