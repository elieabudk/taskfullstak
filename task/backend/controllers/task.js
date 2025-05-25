import Task from '../models/task.js';
import User from '../models/users.js';

export const crearTarea = async (req, res) => {
    try {
        const { task } = req.body; // Extraemos task del body
        const iduser = req.usuario._id;

        console.log("Task recibida:", task);
        console.log("ID Usuario:", iduser);

        // Crear nueva tarea
        const nuevaTarea = new Task({
            iduser,
            task
        });

        // Guardar la tarea en la base de datos
        await nuevaTarea.save();

        // Obtener el email del usuario
        const usuario = await User.findById(iduser);

        res.status(201).json({
            mensaje: 'Tarea creada exitosamente',
            tarea: {
                id: nuevaTarea._id,
                task: nuevaTarea.task,
                email: usuario.email,
                createdAt: nuevaTarea.createdAt
            }
        });

    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({
            mensaje: 'Error al crear la tarea',
            error: error.message
        });
    }
};

export const obtenerTareas = async (req, res) => {
    try {
        const iduser = req.usuario._id;
        
        // Buscar todas las tareas del usuario y poblar el email del usuario
        const tareas = await Task.find({ iduser })
            .populate('iduser', 'email')
            .sort({ createdAt: -1 });

        // Formatear la respuesta para incluir el email
        const tareasFormateadas = tareas.map(tarea => ({
            id: tarea._id,
            task: tarea.task,
            email: tarea.iduser.email,
            createdAt: tarea.createdAt
        }));

        res.status(200).json({
            mensaje: 'Tareas obtenidas exitosamente',
            tareas: tareasFormateadas
        });

    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({
            mensaje: 'Error al obtener las tareas',
            error: error.message
        });
    }
};
