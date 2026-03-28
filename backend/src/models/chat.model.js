import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		title: { type: String, default: 'New Chat' },
		lastMessageAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

export const Chat = mongoose.model('Chat', chatSchema);
