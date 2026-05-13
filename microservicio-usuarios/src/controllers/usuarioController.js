const Usuario = require('../models/Usuario');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



// CREAR USUARIO

const crearUsuario = async (req, res) => {

    try {

        const { nombre, correo, password, cargo } = req.body;


        const existe = await Usuario.findOne({ correo });


        if (existe) {

            return res.status(400).json({

                mensaje: 'Usuario ya existe'

            });

        }


        const passwordHash = await bcrypt.hash(password, 10);


        const usuario = new Usuario({

            nombre,

            correo,

            password: passwordHash,

            cargo

        });


        await usuario.save();


        res.status(201).json(usuario);

    }

    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};




// OBTENER USUARIOS

const obtenerUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find();

        res.json(usuarios);

    }

    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};




// LOGIN

const login = async (req, res) => {

    try {

        const { correo, password } = req.body;


        const usuario = await Usuario.findOne({ correo });


        if (!usuario) {

            return res.status(404).json({

                mensaje: 'Usuario no encontrado'

            });

        }


        const validar = await bcrypt.compare(

            password,

            usuario.password

        );


        if (!validar) {

            return res.status(401).json({

                mensaje: 'Contraseña incorrecta'

            });

        }


        const token = jwt.sign(

            { id: usuario._id },

            process.env.JWT_SECRET,

            { expiresIn: '1h' }

        );


        res.json({

            token,

            usuario

        });

    }

    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};




// ACTUALIZAR USUARIO

const actualizarUsuario = async (req, res) => {

    try {

        const usuarioActualizado = await Usuario.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );


        res.json(usuarioActualizado);

    }

    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};




// ELIMINAR USUARIO

const eliminarUsuario = async (req, res) => {

    try {

        await Usuario.findByIdAndDelete(req.params.id);


        res.json({

            mensaje: 'Usuario eliminado'

        });

    }

    catch (error) {

        res.status(500).json({

            mensaje: error.message

        });

    }

};




// EXPORTAR

module.exports = {

    crearUsuario,

    obtenerUsuarios,

    login,

    actualizarUsuario,

    eliminarUsuario

};