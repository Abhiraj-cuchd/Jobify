import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

const path = '/api-v1/';

router.use(`${path}auth`, authRoutes);

export default router;