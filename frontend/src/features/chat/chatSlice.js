import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const createChat = createAsyncThunk('chat/create', async payload => {
	const { data } = await api.post('/chat', payload || {});
	return data;
});

export const fetchChat = createAsyncThunk('chat/fetch', async chatId => {
	const { data } = await api.get(`/chat/${chatId}`);
	return data;
});

export const sendMessage = createAsyncThunk(
	'chat/sendMessage',
	async ({ chatId, payload }) => {
		const { data } = await api.post(`/chat/${chatId}/message`, payload);
		return data;
	},
);

const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		currentChat: null,
		messages: [],
		loading: false,
		thinking: false,
	},
	reducers: {
		appendUserMessage(state, action) {
			state.messages.push(action.payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchChat.pending, state => {
				state.loading = true;
			})
			.addCase(fetchChat.fulfilled, (state, action) => {
				state.loading = false;
				state.currentChat = action.payload.chat;
				state.messages = action.payload.messages;
			})
			.addCase(sendMessage.pending, state => {
				state.thinking = true;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.thinking = false;
				state.messages.push(action.payload);
			})
			.addCase(sendMessage.rejected, state => {
				state.thinking = false;
			})
			.addCase(createChat.fulfilled, (state, action) => {
				state.currentChat = action.payload;
				state.messages = [];
			});
	},
});

export const { appendUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
