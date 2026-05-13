const Tarea = require('../models/Tarea');



exports.crearTarea = async (req, res) => {

    try {

        const tarea = new Tarea(req.body);

        await tarea.save();

        res.status(201).json(tarea);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};



exports.obtenerTareas = async (req, res) => {

    try {

        const tareas = await Tarea.find();

        res.json(tareas);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};



exports.obtenerTarea = async (req, res) => {

    try {

        const tarea = await Tarea.findById(req.params.id);

        res.json(tarea);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};



exports.actualizarTarea = async (req, res) => {

    try {

        const tarea = await Tarea.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(tarea);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};



exports.eliminarTarea = async (req, res) => {

    try {

        await Tarea.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: 'Tarea eliminada'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};