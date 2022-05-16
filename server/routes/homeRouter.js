// Import Express Router
import { Router } from 'express';
// Importando el controlador de Home
import homeController from '../controllers/homeController';

// Creo una instancia de Router de Express
const router = new Router();

// Get "/"
router.get(['/', '/home'], homeController.index);

// Get "/about"
router.get('/about', homeController.about);

// Exportando Router
export default router;
