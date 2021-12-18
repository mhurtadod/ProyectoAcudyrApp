const mongoose = require('mongoose');
//Esquema de módelo que se manda a la base de datos (El objeto)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ingresa tu nombre!"],
        trim: true
    },
    
    email: {
        type: String,
        required: [true, "Ingresa tu correo electrónico!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Ingresa tu contraseña!"]
    },

    rol:{
        type:Number,
        default: 0
    },
    vaccines: {
        type: [
            {
                name: {
                    type: String,
                    required: [true, "Ingresa nombre!"],
                    trim: true
                },
                
                applied: {
                    type: Boolean,
                    required: [true, "Ingresa si la vacuna fué aplicada!"]
                }
            }
        ]
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)