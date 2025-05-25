import bcrypt from 'bcryptjs';
import User from '../models/users.js';

export const registro = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validar campos requeridos
        if (!email || !password) {
            return res.status(400).json({
                mensaje: 'Email y contraseña son requeridos'
            });
        }

        // Validar formato de email
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                mensaje: 'Por favor ingrese un email válido'
            });
        }

        // Validar longitud mínima de contraseña
        if (password.length < 6) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ email: email.toLowerCase() });
        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: 'El email ya está registrado'
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptado = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const nuevoUsuario = new User({
            email: email.toLowerCase(),
            password: passwordEncriptado
        });

        // Guardar usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario._id,
                email: nuevoUsuario.email,
                createdAt: nuevoUsuario.createdAt
            }
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        
        // Manejar errores específicos de MongoDB
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: 'El email ya está registrado'
            });
        }

        res.status(500).json({
            mensaje: 'Error al registrar el usuario',
            error: error.message
        });
    }
};
