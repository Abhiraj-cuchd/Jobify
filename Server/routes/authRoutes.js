import express from 'express';
import rateLimit from 'express-rate-limit';
import { register, login } from '../controllers/authController.js';

const limiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    standardHeaders: true,
    legacyHeaders: false,
});

const router = express.Router();

//Register routes
router.post("/register", limiter, register);
router.post("/login", limiter, login);

export default router;