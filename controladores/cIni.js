const mongoose = require('mongoose');
const fs = require("fs");
const Tipo = require('../modelos/mTipo.js');
const Usuario = require('../modelos/mUsuario.js');
const async = require("async");
const { debugPort } = require('process');

exports.updateTipos =  () => {
    let tipos = JSON.parse(fs.readFileSync('./tipos.json'));
    async.each(tipos, function(tipo, next){
        Tipo.updateOne({codigo: tipo.codigo},{$set:{
            codigo: tipo.codigo,
            sigla: tipo.sigla,
            padre: tipo.padre,
            permisos: tipo.permisos}},
           {upsert:true}, function(err, res){
                if (err) {next(err)}
                next(null, null);
            })
    },  function(err, res){
        if (err) {console.log(err)}
        else console.log("actualizado tipos")
    });
   
};

exports.creaAdmin =  async () => {
    try {
        let admin = await Usuario.findOne({email: "Admin@dgt.es"}).exec();
        if (!admin) {
            admin = await Usuario.create({              
                email: "Admin@dgt.es",
                nombre: "administrador",
                admin: true,
                oat: false,
                oi: false,
                reset: true,
                password: "123456"
            });
        
            console.log("creado admin");

        }    
        
    }    
    catch (error) {

        console.log(error);

    }



};
