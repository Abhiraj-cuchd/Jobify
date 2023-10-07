import express from 'express';
import rateLimit from 'express-rate-limit';
import { getAllCompanies, getCompanyById, getCompanyProfile, getCompnayJobListings, register, signIn, updateCompanyProfile } from '../controllers/companyController.js';
import userAuth from '../middleware/authMiddleWare.js';

const router = express.Router();

const limiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', limiter, register);
router.post('/login', limiter, signIn);
router.post('/get-company', userAuth, getCompanyProfile);
router.post('/get-company-joblistings', userAuth, getCompnayJobListings);
router.put('/update-company', userAuth, updateCompanyProfile);
router.get('/', getAllCompanies);
router.get('/get-company:id', getCompanyById);


export default router;

