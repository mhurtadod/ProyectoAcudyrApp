const mongoose = require('mongoose');

//Esquema de módelo que se manda a la base de datos (El objeto)
const vaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingresa nombre!"],
        trim: true,
        unique: true
    },
    
    stock: {
        type: Number,
        required: [true, "Ingresa la cantidad de vacunas disponibles!"]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Vaccines", vaccineSchema)