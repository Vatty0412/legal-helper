import { env } from '../config/env.js';
import { ApiError } from '../utils/api-error.js';

export function internalAuthMiddleware(req, _res, next) {
	const provided = req.headers['x-internal-api-key'];
	if (!env.internalApiKey || provided !== env.internalApiKey) {
		return next(new ApiError(401, 'Invalid internal API key'));
	}
	return next();
}
