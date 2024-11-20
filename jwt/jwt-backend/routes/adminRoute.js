import express from 'express';
import { admin } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import authorizedRoles from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware ,authorizedRoles("admin"), admin);

export default router;