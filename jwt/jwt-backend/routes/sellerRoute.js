import express from 'express';
import { seller } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import authorizedRoles from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware ,authorizedRoles("seller"), seller);

export default router;