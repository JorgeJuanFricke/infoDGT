const Usuario = require('../modelos/mUsuario.js');
const mongoose = require('mongoose');
const Tipo = require('../modelos/mTipo.js');





exports.updateUsuario = async (email, nombre, password, admin, oi, oat) => {
    let body = {
        email:email,
        nombre:nombre,
        password:password,
        admin:admin,
        oi:oi,
        oat:oat,
        ex:ex,
        san:san
    };

   // Usuario.findOneAndUpdate({email:email}, body, {runValidators:true, upsert: true, new: true}).exec((error, usuario) => {


}


exports.listaUsuarios = (sujeto) => {

    //Usuario.find({}).exec((error, usuarios)

};


exports.borraUsuario = (email) => {

    //Usuario.findOneAndDelete({email:email}).exec();


}
