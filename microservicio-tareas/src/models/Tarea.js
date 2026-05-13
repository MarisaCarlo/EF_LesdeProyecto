const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    area: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        default: 'Pendiente'
    },

    responsable: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Tarea', TareaSchema);