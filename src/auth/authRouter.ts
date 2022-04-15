import express from 'express';
import authController from './authController';
import { registrationValidation } from '../services/registration-validation';

const router = express.Router();

router.post('/registration', registrationValidation, authController.registration);
router.post('/login', authController.login);
router.post('/token', authController.RefreshAccessToken);

export default router;
