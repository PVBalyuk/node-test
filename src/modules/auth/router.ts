import express from 'express';
import { registrationValidation } from './registration-validation';
import { registration } from './handlers/registation';
import { login } from './handlers/login';
import { refreshToken } from './handlers/refresh-token';
import { validateAuth } from './authMiddleware/validateAuth';

const router = express.Router();

router.post('/registration', registrationValidation, validateAuth, registration);
router.post('/login', login);
router.post('/token', refreshToken);

export default router;
