const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const SALT_FACTOR = 10;


const UsuarioSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String
       
    },
    nombre: {
        type: String,
        required: true
    },
    
    admin: { type:Boolean, default: false},
    oi: {type:Boolean, default:false},
    oat:{ype: Boolean, default:false},
    createdAt: {
        type: Date,
        default: Date.now
    }


});




const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;