const Tipo = require('./mTipo');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const RecursoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    
    titulo: {
        type: String,
        required: true
    },

    etiqueta: {
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

    publicacion: {type:Date,required: true},
  
    derogacion: {type:Date},

    
});

RecursoSchema.index({ titulo: 'text', etiqueta: 'text', descripcion: 'text', autor: 'text' },

{
    name: "recursos_textos",

    //  (default es 1)
    weights: {
        titulo: 5,  
        etiqueta: 4  
    }
});

RecursoSchema.index({
    tipo: 1,
    nombre: 1
});



RecursoSchema.pre('save', function (next) {
    Tipo.findOne({
        codigo: this.tipo
    }, function (error, tipo) {
        if ((error) || !tipo) {
            return next('tipo no existe')
        }
        return next();
    })
});


RecursoSchema.pre('save', function (next) {
    Categoria.findOne({
        categoria: this.categoria
    }, function (error, categoria) {
        if ((error) || !categoria) {
            return next('categoría no existe')
        }
        return next();
    })
});

module.exports = RecursoSchema;