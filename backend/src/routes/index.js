import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { userRouter } from './user.routes.js';
import { chatRouter } from './chat.routes.js';
import { documentRouter } from './document.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/chat', chatRouter);
router.use('/documents', documentRouter);

export { router as apiRouter };
