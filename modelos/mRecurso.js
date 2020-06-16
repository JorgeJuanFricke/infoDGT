
const mongoose = require('mongoose');



let RecursoSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    tipo: {
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
        //required: true
    },

    autor: {
        type: String,
        //required: true
    },


    actualizadoPor: {
        type: String
        
    },

    procedencia: {type: String},

    publicacion: {type:Date},
  
    derogacion: {type:Date},

    
});

RecursoSchema.index({ nombre: 'text', descripcion: 'text' },

{
    name: "nombreydescripcion",

    //  (default es 1)
    weights: {
        nombre: 5,  
        descripcion: 4  
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

const Recurso = mongoose.model('Recurso', RecursoSchema);
module.exports = Recurso;