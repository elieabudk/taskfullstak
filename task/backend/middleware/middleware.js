import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import dotenv from 'dotenv';
import { logger } from '../config/logger.js';

dotenv.config();

export const verificarToken = async (req, res, next) => {
    try {
        // Obtener el token del header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            logger.warn('Intento de acceso sin token');
            return res.status(401).json({
                mensaje: 'No se proporcionó un token de autenticación'
            });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Buscar el usuario
        const usuario = await User.findById(decoded.id).select('-password');
        
        if (!usuario) {
            logger.warn('Token inválido - Usuario no encontrado', { userId: decoded.id });
            return res.status(401).json({
                mensaje: 'Token inválido'
            });
        }

        // Agregar el usuario al request
        req.usuario = usuario;
        logger.info('Token verificado exitosamente', { userId: usuario._id });
        next();
        
    } catch (error) {
        logger.error('Error en la verificación del token', { 
            error: error.message,
            name: error.name,
            stack: error.stack
        });
        res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};
