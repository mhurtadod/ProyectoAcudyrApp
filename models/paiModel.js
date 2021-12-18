const mongoose = require('mongoose');
//Esquema de módelo que se manda a la base de datos (El objeto)
const paiSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: [true, "Ingresa la edad!"]
    },  
    vaccines: {
        type: [
            {
                name: {
                    type: String,
                    required: [true, "Ingresa nombre!"],
                    trim: true
                }
            }
        ]
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model("Pai", paiSchema)