const express = require('express');

const router = express.Router();

const {
    crearTarea,
    obtenerTareas,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea
} = require('../controllers/tareaController');


// CRUD

router.post('/', crearTarea);

router.get('/', obtenerTareas);

router.get('/:id', obtenerTarea);

router.put('/:id', actualizarTarea);

router.delete('/:id', eliminarTarea);


module.exports = router;