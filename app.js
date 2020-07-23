let config = require("./configuracion.js");
//const createError = require('http-errors');
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
//const logger = require("morgan");
const bodyParser = require("body-parser");
const ini = require("./controladores/cIni");
const env = require("dotenv").config();
const moment = require('moment');
const exphbs = require('express-handlebars');

const morgan = require("morgan");



const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();


app.use(morgan('dev'));


/**** directorios  ***************/
const fs = require("fs");
const dataDir = __dirname + "/public/uploads";
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);

const dataDir2 = __dirname + "/uploads";
fs.existsSync(dataDir2) || fs.mkdirSync(dataDir2);



/********** static ******************/
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/uploads")));





app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.use(
  express.urlencoded({
    extended: false
  })
);

app.post('/documento', upload.single('documento'), function (req, res, next) {
  // req.file is the `avatar` file
  
  return res.json(req.file);
})

app.use(express.json());



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
  let usuario = {
    email: 'jorge@gmail.com',
    admin: true
  }
  res.locals.currentUser = usuario;   //req.user;
  next();
});







/**** actualizar datos ******************/
ini.updateTipos();





/****** routers *************************/
const recursosRouter = require("./rutas/rRecursos.js");
const indexRouter = require("./rutas/rIndex.js");

const usuariosRouter = require("./rutas/rUsuarios");
const { getMaxListeners } = require("gulp");

app.use("/recurso", recursosRouter);
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
 
  const status = error.statusCode || 500;
  
  res.status(status).json(error);
});


module.exports = app;
