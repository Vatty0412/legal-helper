import { ApiError } from '../utils/api-error.js';
import { env } from '../config/env.js';
import { verifyAccessToken } from '../utils/tokens.js';
import { User } from '../models/user.model.js';

export async function authMiddleware(req, _res, next) {
	if (env.nodeEnv !== 'production' && env.devAuthBypass) {
		let user = await User.findOne({ email: env.devAuthEmail }).select(
			'_id email name avatar',
		);
		if (!user) {
			const created = await User.create({
				name: env.devAuthName,
				email: env.devAuthEmail,
				passwordHash: 'dev-auth-bypass',
			});
			user = await User.findById(created._id).select(
				'_id email name avatar',
			);
		}
		req.user = user;
		return next();
	}

	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

	if (!token) {
		return next(new ApiError(401, 'Missing access token'));
	}

	try {
		const payload = verifyAccessToken(token);
		const user = await User.findById(payload.sub).select(
			'_id email name avatar',
		);
		if (!user) {
			return next(new ApiError(401, 'Invalid access token'));
		}
		req.user = user;
		return next();
	} catch {
		return next(new ApiError(401, 'Invalid or expired access token'));
	}
}
