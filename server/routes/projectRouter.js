// Importando el Router de Express
import { Router } from 'express';

// Importando el validador
import Validate from '../validators/validateFactory';

// Importamos el esquema de validacion
import projectValidator from '../validators/projectValidator';

// Importando el controlador de proyectos
import projectController from '../controllers/projectController';

// Creo una instancia del router
const router = new Router();

/* -------- GET -------- */
// Listar proyectos
// GET /projects/ | GET /projects/index
router.get(['/', '/index'], projectController.index);

// Envia el formulario para registrar una idea de proyecto
// GET /projects/add
router.get('/add', projectController.add);

/* -------- POST  -------- */
// Procesa el formulario que Agrega ideas de Proyectos
// POST /projects/add
// Validate funcion que promete regresar un middleware
router.post(
  '/add',
  Validate({
    shape: projectValidator.projectSchema,
    getObject: projectValidator.getProject,
  }),
  projectController.addPost
);

// Exportando en enrutador Projects
export default router;
