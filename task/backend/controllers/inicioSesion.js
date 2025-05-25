import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const inicioSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por email
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                mensaje: 'Credenciales inválidas'
            });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({
                mensaje: 'Credenciales inválidas'
            });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Si todo es correcto, devolver la información del usuario y el token
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario._id,
                email: usuario.email,
                createdAt: usuario.createdAt
            },
            token
        });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};
