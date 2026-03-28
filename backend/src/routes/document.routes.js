import { Router } from 'express';
import {
	getDocumentStatus,
	listDocuments,
	retryDocument,
	updateDocumentStatusInternal,
	uploadDocument,
} from '../controllers/document.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { internalAuthMiddleware } from '../middleware/internal-auth.middleware.js';
import { upload } from '../utils/upload.js';

const router = Router();

router.post(
	'/internal/status',
	internalAuthMiddleware,
	updateDocumentStatusInternal,
);

router.use(authMiddleware);
router.post('/upload', upload.single('file'), uploadDocument);
router.get('/', listDocuments);
router.get('/:id/status', getDocumentStatus);
router.post('/:id/retry', retryDocument);

export { router as documentRouter };
