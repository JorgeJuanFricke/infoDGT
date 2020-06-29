let config = require("./configuracion.js");
//const createError = require('http-errors');
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const ini = require("./controladores/cIni");
const env = require("dotenv").config();
const moment = require('moment');
const exphbs = require('express-handlebars');

upload = require('jquery-file-upload-middleware');

const app = express();




/**** directorios  ***************/
const fs = require("fs");
const dataDir = __dirname + "/public/uploads";
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);



/*** logger **********************/

app.use(logger("combined"));
/********** static ******************/
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/uploads")));



app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// configure upload middleware

app.use('/upload', function(req, res, next){
  upload.fileHandler({
      uploadDir: function () {
          return __dirname + '/public/uploads/'
      },
      uploadUrl: function () {
          return '/uploads'
      }
  })(req, res, next);
});



/*
app.use(
  express.urlencoded({
    extended: false
  })
);
*/
/********* mongo ******************/

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


/********  handlebars ***********************/

var hbs = exphbs.create({

  extname: "hbs",
  defaultLayout: "main",
  partialsDir: __dirname + "/views/partials/",
  layoutsDir: __dirname + "/views/layouts/",
  // Specify helpers which are only registered on this instance.
  helpers: {
    formatDate: function (datetime, format) {
      return moment(datetime).format(format);
    },
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



hbs.getPartials().then(function(partials) {
  console.log(partials);
  
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');





/*** usuario actual para handlebars *************/
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
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

upload.on('error', function (e, req, res) {
  console.log(e.message);
});

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
