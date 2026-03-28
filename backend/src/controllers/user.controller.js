import { Chat } from '../models/chat.model.js';
import { Document } from '../models/document.model.js';
import { Message } from '../models/message.model.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

export const getProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select(
		'name email avatar createdAt sessions',
	);
	res.json({
		id: user._id,
		name: user.name,
		email: user.email,
		avatar: user.avatar,
		createdAt: user.createdAt,
		sessionCount: user.sessions.length,
	});
});

export const updateProfile = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user._id, req.body, {
		new: true,
		runValidators: true,
	}).select('name email avatar');
	res.json(user);
});

export const deleteAccount = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	await Promise.all([
		User.deleteOne({ _id: userId }),
		Chat.deleteMany({ userId }),
		Message.deleteMany({ userId }),
		Document.deleteMany({ userId }),
	]);
	res.status(204).send();
});
