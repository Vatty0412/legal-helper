import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		filename: { type: String, required: true },
		originalName: { type: String, required: true },
		mimeType: { type: String, required: true },
		size: { type: Number, required: true },
		storagePath: { type: String, required: true },
		checksum: { type: String, required: true, index: true },
		status: {
			type: String,
			enum: ['pending', 'processing', 'completed', 'failed'],
			default: 'pending',
			index: true,
		},
		retryCount: { type: Number, default: 0 },
		lastError: { type: String, default: '' },
		ingestionJobId: { type: String, default: '' },
	},
	{ timestamps: true },
);

documentSchema.index({ userId: 1, checksum: 1 }, { unique: true });

export const Document = mongoose.model('Document', documentSchema);
