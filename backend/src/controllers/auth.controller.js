import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from '../utils/tokens.js';

function buildTokens(userId) {
	const sub = String(userId);
	return {
		accessToken: signAccessToken({ sub }),
		refreshToken: signRefreshToken({ sub }),
	};
}

export const signup = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const existing = await User.findOne({ email });
	if (existing) {
		throw new ApiError(409, 'Email already registered');
	}

	const passwordHash = await bcrypt.hash(password, 12);
	const user = await User.create({ name, email, passwordHash });

	const tokens = buildTokens(user._id);
	user.sessions.push({
		refreshToken: tokens.refreshToken,
		userAgent: req.headers['user-agent'] || '',
		ip: req.ip,
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	});
	await user.save();

	res.status(201).json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
		},
		...tokens,
	});
});

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(401, 'Invalid credentials');
	}

	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) {
		throw new ApiError(401, 'Invalid credentials');
	}

	const tokens = buildTokens(user._id);
	user.sessions.push({
		refreshToken: tokens.refreshToken,
		userAgent: req.headers['user-agent'] || '',
		ip: req.ip,
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	});
	await user.save();

	res.json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
		},
		...tokens,
	});
});

export const refresh = asyncHandler(async (req, res) => {
	const { refreshToken } = req.body;
	let payload;
	try {
		payload = verifyRefreshToken(refreshToken);
	} catch {
		throw new ApiError(401, 'Invalid refresh token');
	}

	const user = await User.findById(payload.sub);
	if (!user) {
		throw new ApiError(401, 'Invalid refresh token');
	}

	const session = user.sessions.find(s => s.refreshToken === refreshToken);
	if (!session) {
		throw new ApiError(401, 'Refresh session not found');
	}

	const tokens = buildTokens(user._id);
	session.refreshToken = tokens.refreshToken;
	session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	await user.save();

	res.json(tokens);
});
