let config = require("./configuracion.js");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ini = require("./controladores/cIni");
const env = require("dotenv").config();
const morgan = require("morgan");
const multer = require('multer');


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




//const upload = multer({ dest: 'uploads/' })

app.use(express.json());



/********* mongo ******************/

console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
  case "desarrollo":
    try {
      db = mongoose.connect(config.desarrollo, {
        useNewUrlParser: true,  useFindAndModify: false 
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
};











/**** actualizar datos ******************/
ini.updateTipos();
ini.creaAdmin();





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
  
  res.status(status).json({message: error.message});
});


module.exports = app;
