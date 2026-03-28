import crypto from 'crypto';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { env } from '../config/env.js';

const uploadPath = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, uploadPath),
	filename: (_req, file, cb) => {
		const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${suffix}-${file.originalname.replace(/\s+/g, '_')}`);
	},
});

const allowed = new Set([
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export const upload = multer({
	storage,
	limits: { fileSize: env.maxUploadSizeMb * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		if (!allowed.has(file.mimetype)) {
			return cb(new Error('Only PDF and DOCX files are allowed'));
		}
		cb(null, true);
	},
});

export function computeChecksum(fileBuffer) {
	return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}
