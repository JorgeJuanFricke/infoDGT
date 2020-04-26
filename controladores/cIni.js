const mongoose = require('mongoose');
const fs = require("fs");
const Tipo = require('../modelos/mTipo.js');
const async = require("async");

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
