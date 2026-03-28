import mongoose from 'mongoose';

const tokenUsageSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
			index: true,
		},
		messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
		provider: { type: String, default: 'gemini' },
		inputTokens: { type: Number, default: 0 },
		outputTokens: { type: Number, default: 0 },
		totalTokens: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

export const TokenUsage = mongoose.model('TokenUsage', tokenUsageSchema);
