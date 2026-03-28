import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const uploadDocument = createAsyncThunk(
	'documents/upload',
	async file => {
		const form = new FormData();
		form.append('file', file);
		const { data } = await api.post('/documents/upload', form, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	},
);

export const fetchDocuments = createAsyncThunk('documents/list', async () => {
	const { data } = await api.get('/documents');
	return data;
});

export const retryDocument = createAsyncThunk('documents/retry', async id => {
	const { data } = await api.post(`/documents/${id}/retry`);
	return data;
});

const documentSlice = createSlice({
	name: 'documents',
	initialState: {
		items: [],
		loading: false,
		uploadState: 'idle',
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDocuments.pending, state => {
				state.loading = true;
			})
			.addCase(fetchDocuments.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(uploadDocument.pending, state => {
				state.uploadState = 'uploading';
			})
			.addCase(uploadDocument.fulfilled, state => {
				state.uploadState = 'started';
			})
			.addCase(uploadDocument.rejected, state => {
				state.uploadState = 'failed';
			})
			.addCase(retryDocument.fulfilled, (state, action) => {
				const id = action.payload.id;
				const target = state.items.find(d => d._id === id);
				if (target) {
					target.status = 'processing';
					target.retryCount += 1;
				}
			});
	},
});

export default documentSlice.reducer;
