
const Tipo = require('../modelos/mTipo.js');
const Recurso = require('../modelos/mRecurso.js');
const app = require("../app");
const Usuario = require('../modelos/mUsuario');
const config = require('../configuracion.js');
const Auto = require('../middleware/Autorizacion');

const {
    validationResult
} = require('express-validator/check');





exports.getListaTipos = async (req,res,next) => {
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

}




exports.getRecursos = async (req, res, next) => {

    const pagina = req.query.pagina || 1;
    const recursosPagina = config.recursosPagina;
    const texto = req.query.texto;
        
       try {
        /*
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
        */
        let usuario = req.Usuario;

        let recursos = await Recurso.fuzzySearch(texto)
        .populate('tipo')
        .skip((pagina - 1) * recursosPagina)
        .limit(recursosPagina)
        .exec();

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
