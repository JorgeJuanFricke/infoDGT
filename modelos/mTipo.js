// categoria

const mongoose = require("mongoose");

const TipoSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  sigla: String,
   
  permisos: [String]
 
  
});

let Tipo = mongoose.model("Tipo", TipoSchema);
module.exports = Tipo;