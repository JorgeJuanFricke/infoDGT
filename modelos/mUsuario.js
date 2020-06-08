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
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    estado: Number,
    admin: Boolean,
    oi: Boolean,
    oat: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },


});





const noop = function () {};

UsuarioSchema.pre('insertMany', function (next) {
    try {
        this._update.password = bcryptjs.hashSync(this._update.password, 10);
    } catch {
        return next("error encriptacion");
    }
    next();
});


UsuarioSchema.pre("update", {query:true}, function(done) {
     let Usuario = this;
    if (!Usuario.isModified("password")) {
        return done();
    }
    bcryptjs.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }
        bcryptjs.hash(Usuario.password, salt, noop, function(err, hashedPassword) {
            if (err) { return done(err); }
            Usuario.password = hashedPassword;
            done();
        });
    });
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