import express from 'express';
import { user } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import authorizedRoles from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware ,authorizedRoles("user"), user);

export default router;