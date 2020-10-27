
const Tipo = require('../modelos/mTipo.js');
const Recurso = require('../modelos/mRecurso.js');
const app = require("../app");
const Usuario = require('../modelos/mUsuario');
const config = require('../configuracion.js');
const Auto = require('../middleware/Autorizacion');

global.CronJob = require('../cron.js');
const backup = require('../mongodb_backup');

const {
    validationResult
} = require('express-validator/check');
const configuracion = require('../configuracion.js');



exports.getUsuarioActual  = async(req, res, next) => {
    try {
      let usuario = await Usuario.findOne({email:req.email});
      if (!usuario) {
        const error = new Error("Usuario no encontrado.");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({ message: 'usuario encontrado.', usuario: usuario });
      
    } catch (error) {
      
      next(error);
    }
  };



  



exports.getListaTiposUsuario = async (req,res,next) => {
    // dar los tipos a los que puede añadir 
    let permisosUsuario = [];
    try {
        let usuario = await Usuario.findOne({email: app.currentUser});
  
        if (usuario._doc.admin) {
            permisosUsuario.push('ADMIN');
        } 
        if (usuario._doc.oat) {
            permisosUsuario.push('OAT');
        }
        if (usuario._doc.oi) {
            permisosUsuario.push('OI');
        } 
       if(permisosUsuario.length > 0) {
            let tipos = await Tipo.find({permisos: {$in: permisosUsuario }}, {codigo: 1  })
            .sort('codigo').lean();
            let listaTipos = tipos.map(function (tipo) {
                return {id: tipo._id, text:tipo.codigo}
            });
            return res.json(listaTipos);
       } else {
            const error = new Error('El usuario no tiene ningún permiso');
            error.statusCode = 401;
            throw error;
           
       }

       
    }
    catch (error) {
       
        next(error);
    }   

};




exports.getListaTipos = async (req,res,next) => {
  // dar los tipos a los que puede añadir 
  try {
          let tipos = await Tipo.find({}, {codigo: 1  })
          .sort('codigo').lean();
          let listaTipos = tipos.map(function (tipo) {
              return {id: tipo._id, text:tipo.codigo}
          });
          return res.json({results: listaTipos});
    
     
  }
  catch (error) {
     
      next(error);
  }   

};




exports.getRecursos = async (req, res, next) => {

    const pagina = req.query.pagina || 1;
    const recursosPagina = config.recursosPagina;
    const texto = req.query.texto;
    const tipo  = req.query.tipo;
    let usuario = req.Usuario;
    let recursos = [];   
       try {
          
          let totalRecursos =  await Recurso.find({ 
              $text : { 
                  $search : texto
              } 
          }).countDocuments();


          let recursos = await Recurso.find({ 
              $text : { 
                  $search : texto
              } 
          },
          { score:{$meta:'textScore'} })
          .sort({ score : { $meta : 'textScore' } })
          .populate('tipo')
          .skip((pagina - 1) * recursosPagina)
          .limit(recursosPagina)
          .exec();
          
        
          /*
        if (tipo) {
          recursos = await Recurso.fuzzySearch({query:texto, prefixOnly: true, minSize: 4 }, {tipo: tipo})
          .populate('tipo')
          .skip((pagina - 1) * recursosPagina)
          .limit(recursosPagina)
          .exec();

        }
        else  {
          recursos = await Recurso.fuzzySearch({query:texto, prefixOnly: true, minSize: 4 })
          .populate('tipo')
          .skip((pagina - 1) * recursosPagina)
          .limit(recursosPagina)
          .exec();

        } 
       */

        let totalRecursos = recursos.length;

       res.status(200).json({
         message: 'página de recursos cargados correctamente!!.',
         usuario: usuario,
         recursos: recursos,
         pagina: pagina,
         totalRecursos: totalRecursos,
         recursosPagina: recursosPagina
       });

   } catch (error) {
    
     next(error);
   }
 };





 



  
exports.renderPagina = async (req, res, next) => {
     
        return res.sendFile(__dirname + '/public/index.html');

};
