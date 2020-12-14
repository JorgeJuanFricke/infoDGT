
const mongoose = require('mongoose');
const Tipo = require('../modelos/mTipo.js');


let RecursoSchema = mongoose.Schema({
    url: {
        type: String,
        
    },

    tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true, index:true },

    tipoNombre: {
        type: String,
        required: true
    },

    
    
    nombre: {
        type: String,
        required: true
    },

   
    descripcion:  {
        type: String,
        required: true
    },

    oficina: {
        type: String,
        required: true
    },

    autor: {
        type: String,
        required: true
    },


    actualizadoPor: {
        type: String
        
    },

    procedencia: {
        type: String,
        required: true 
    },

    publicacion: {
        type:Date,
        required: true
    },
  
    derogacion: {type:Date},

    
});

 
RecursoSchema.index({nombre: 'texto'}, {default_language: "spanish"});
//createIndex({aliases : "texto"}, {nombre : "texto"},{default_language: "spanish" })


RecursoSchema.index({
    tipo: 1,
    nombre: 1
});


/*
no hace falta?
RecursoSchema.pre('save', function (next) {
    Tipo.findById({this.tipo}, function (error, tipo) {
        if ((error) || !tipo) {
            return next('tipo no existe')
        }
        return next();
    })
});
*/
const Recurso = mongoose.model('Recurso', RecursoSchema);
module.exports = Recurso;