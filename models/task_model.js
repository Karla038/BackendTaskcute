const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaVencimiento: {
        type: Date,
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    },
    idUsuario: {
        type: String, // Cambiado a String
        required: true
    }
});

module.exports = model('Task', TaskSchema);
