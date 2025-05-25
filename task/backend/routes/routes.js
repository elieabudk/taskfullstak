import { Router } from 'express';
import { registro } from '../controllers/registro.js';
import { inicioSesion } from '../controllers/inicioSesion.js';
import { verificarToken } from '../middleware/middleware.js';
import { crearTarea, obtenerTareas } from '../controllers/task.js';

 const router = Router();

router.post('/registro', registro);
router.post('/inicio-sesion', inicioSesion);
router.post('/crear-tarea' , verificarToken, crearTarea);
router.get('/obtener-tareas',  verificarToken, obtenerTareas);



export default router;
