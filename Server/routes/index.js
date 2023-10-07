import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import companyRoutes from './companyRoutes.js';

const router = express.Router();

const path = '/api-v1/';

router.use(`${path}auth`, authRoutes);
router.use(`${path}user`, userRoutes);
router.use(`${path}companies`, companyRoutes);

export default router;