// logger.js
import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors } = format;

// Formato personalizado
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Logger configurado
export const logger = createLogger({
  level: 'info', // Nivel mínimo a registrar (info, warn, error, etc.)
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Para capturar el stack trace de los errores
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Solo errores
    new transports.File({ filename: 'logs/combined.log' }) // Todo tipo de logs
  ],
});

// Solo en desarrollo: también mostrar en consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}



