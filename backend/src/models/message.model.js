import mongoose from 'mongoose';

const citationSchema = new mongoose.Schema(
	{
		documentId: { type: String },
		chunkId: { type: String },
		text: { type: String },
		score: { type: Number },
	},
	{ _id: false },
);

const usageSchema = new mongoose.Schema(
	{
		provider: { type: String },
		inputTokens: { type: Number, default: 0 },
		outputTokens: { type: Number, default: 0 },
		totalTokens: { type: Number, default: 0 },
	},
	{ _id: false },
);

const messageSchema = new mongoose.Schema(
	{
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
			required: true,
			index: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		role: { type: String, enum: ['user', 'assistant'], required: true },
		content: { type: String, required: true },
		citations: { type: [citationSchema], default: [] },
		usage: { type: usageSchema, default: () => ({}) },
		editedFromMessageId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
			default: null,
		},
	},
	{ timestamps: true },
);

export const Message = mongoose.model('Message', messageSchema);
