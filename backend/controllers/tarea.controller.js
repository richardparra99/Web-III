const db = require("../models");

exports.obtenerTodasLasTareas = async (req, res) => {
    try {
        const tareas = await db.tarea.findAll({
            order: [["id", "ASC"]]
        });

        res.json(tareas);
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener las tareas"
        });
    }
};

exports.obtenerTareaPorId = async (req, res) => {
    try {
        const tarea = req.obj;
        res.json(tarea);
    } catch (error) {
        return res.status(500).json({
            error: "Error al obtener la tarea"
        });
    }
};

exports.crearTarea = async (req, res) => {
    const { titulo, completado, fechaCreacion } = req.body;

    try {
        const nuevaTarea = await db.tarea.create({
            titulo,
            completado,
            fechaCreacion
        });

        res.status(201).json(nuevaTarea);
    } catch (error) {
        return res.status(500).json({
            error: "Error al crear la tarea"
        });
    }
};

exports.actualizarTareaCompleta = async (req, res) => {
    const { titulo, completado, fechaCreacion } = req.body;

    try {
        const tarea = req.obj;

        tarea.titulo = titulo;
        tarea.completado = completado;

        if (fechaCreacion !== undefined) {
            tarea.fechaCreacion = fechaCreacion;
        }

        await tarea.save();

        res.json(tarea);
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar la tarea"
        });
    }
};

exports.actualizarTareaParcial = async (req, res) => {
    const { titulo, completado, fechaCreacion } = req.body;

    try {
        const tarea = req.obj;

        if (titulo !== undefined) {
            tarea.titulo = titulo;
        }

        if (completado !== undefined) {
            tarea.completado = completado;
        }

        if (fechaCreacion !== undefined) {
            tarea.fechaCreacion = fechaCreacion;
        }

        await tarea.save();

        res.json(tarea);
    } catch (error) {
        return res.status(500).json({
            error: "Error al actualizar parcialmente la tarea"
        });
    }
};

exports.eliminarTarea = async (req, res) => {
    try {
        const tarea = req.obj;
        await tarea.destroy();

        res.json({
            message: "Tarea eliminada correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error al eliminar la tarea"
        });
    }
};