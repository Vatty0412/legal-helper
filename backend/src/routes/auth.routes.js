import { Router } from 'express';
import { login, refresh, signup } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import {
	loginSchema,
	refreshSchema,
	signupSchema,
} from '../services/validation.js';

const router = Router();

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', validateBody(refreshSchema), refresh);

export { router as authRouter };
