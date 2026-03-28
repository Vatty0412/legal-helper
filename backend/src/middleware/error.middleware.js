import { logger } from '../config/logger.js';

export function errorMiddleware(err, _req, res, _next) {
	const statusCode = err.statusCode || 500;
	logger.error(err.message, { stack: err.stack, details: err.details });
	res.status(statusCode).json({
		error: {
			message: err.message || 'Internal server error',
			details: err.details || null,
		},
	});
}
