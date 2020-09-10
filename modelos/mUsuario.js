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
    oat:{type: Boolean, default:false},
    reset:{type: Boolean, default:false},

    createdAt: {
        type: Date,
        default: Date.now
    }

});

    UsuarioSchema.pre('findOneAndUpdate', async function () {
        try {
            if (this._update.password) {
                 this._update.password = await bcryptjs.hash(this._update.password, 10)
            }    
        }
        catch (err) {
            return next(err);
       }
    })
 

   
    


    UsuarioSchema.pre("save", async function(next) {
        try {
            if (!this.isModified("password")) {
              return next();
            }
            let hashedPassword = await bcryptjs.hash(this.password, 10);
            this.password = hashedPassword;
            return next();
        } catch (err) {
            return next(err);
       }
      });


   
    
    UsuarioSchema.methods.checkPassword = function (guess, done) {
        bcryptjs.compare(guess, this.password, function (err, isMatch) {
            done(err, isMatch);
        });
    };
    
    UsuarioSchema.methods.name = function () {
        return this.nombre || this.email;
    };
    
    
    
    
    const Usuario = mongoose.model('Usuario', UsuarioSchema);
    
    module.exports = Usuario;



