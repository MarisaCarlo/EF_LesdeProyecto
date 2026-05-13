const express = require('express');

const router = express.Router();


const {

    crearUsuario,

    obtenerUsuarios,

    login,

    actualizarUsuario,

    eliminarUsuario

} = require('../controllers/usuarioController');



router.post('/', crearUsuario);

router.get('/', obtenerUsuarios);

router.post('/login', login);

router.put('/:id', actualizarUsuario);

router.delete('/:id', eliminarUsuario);



module.exports = router;