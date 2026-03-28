import { Router } from 'express';
import {
	deleteAccount,
	getProfile,
	updateProfile,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { updateProfileSchema } from '../services/validation.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getProfile);
router.put('/', validateBody(updateProfileSchema), updateProfile);
router.delete('/', deleteAccount);

export { router as userRouter };
