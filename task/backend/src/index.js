import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '../routes/routes.js';
import { logger } from '../config/logger.js';
const app = express();

dotenv.config();

// app.js


// Logs normales
logger.info('Servidor iniciado');
logger.warn('Este es un warning');

// Logs de error
try {
  throw new Error('Algo salió mal');
} catch (error) {
  logger.error(error); // Guarda en error.log y combined.log
}


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prueba-tecnica')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API 2' });
});

// Routes+
app.use('/api', routes);



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 