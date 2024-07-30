const { response } = require('express');
const Task = require('../models/task_model');

// Crear una nueva tarea
const crearTask = async (req, res = response) => {
    try {
        const { nombre, descripcion, fechaVencimiento, completada, idUsuario } = req.body;
        
        // Crear una nueva tarea
        const nuevaTask = new Task({ nombre, descripcion, fechaVencimiento, completada, idUsuario });
        await nuevaTask.save();
        
        res.status(201).json({
            ok: true,
            msg: 'Tarea creada con éxito',
            task: nuevaTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la tarea'
        });
    }
};

// Obtener todas las tareas
const obtenerTasks = async (req, res = response) => {
    try {
        // Obtener todas las tareas
        const tasks = await Task.find();
        res.json({
            ok: true,
            tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las tareas'
        });
    }
};


const obtenerTasksPorIdUsuario = async (req, res = response) => {
    try {
        const { idUsuario } = req.params;
        // Buscar tareas por idUsuario
        const tasks = await Task.find({ idUsuario });
        if (tasks.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron tareas para el usuario proporcionado'
            });
        }
        res.json({
            ok: true,
            tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las tareas'
        });
    }
};
// Actualizar una tarea
const actualizarTask = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, fechaVencimiento, completada } = req.body;
        
        // Actualizar tarea por ID
        const task = await Task.findByIdAndUpdate(id, { nombre, descripcion, fechaVencimiento, completada }, { new: true });
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            });
        }
        res.json({
            ok: true,
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la tarea'
        });
    }
};

// Eliminar una tarea
const eliminarTask = async (req, res = response) => {
    try {
        const { id } = req.params;
        // Eliminar tarea por ID
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            });
        }
        res.json({
            ok: true,
            msg: 'Tarea eliminada con éxito'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la tarea'
        });
    }
};

module.exports = {
    crearTask,
    obtenerTasks,
    obtenerTasksPorIdUsuario,
    actualizarTask,
    eliminarTask
};
