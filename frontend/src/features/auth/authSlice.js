import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, tokenStore } from '../../services/api';

const storedUser = localStorage.getItem('lh_user');

export const signup = createAsyncThunk('auth/signup', async payload => {
	const { data } = await api.post('/auth/signup', payload);
	tokenStore.set(data.accessToken, data.refreshToken);
	localStorage.setItem('lh_refresh_token', data.refreshToken);
	localStorage.setItem('lh_user', JSON.stringify(data.user));
	return data.user;
});

export const login = createAsyncThunk('auth/login', async payload => {
	const { data } = await api.post('/auth/login', payload);
	tokenStore.set(data.accessToken, data.refreshToken);
	localStorage.setItem('lh_refresh_token', data.refreshToken);
	localStorage.setItem('lh_user', JSON.stringify(data.user));
	return data.user;
});

export const fetchProfile = createAsyncThunk('auth/profile', async () => {
	const { data } = await api.get('/user');
	localStorage.setItem('lh_user', JSON.stringify(data));
	return data;
});

export const updateProfile = createAsyncThunk(
	'auth/updateProfile',
	async payload => {
		const { data } = await api.put('/user', payload);
		const merged = {
			...JSON.parse(localStorage.getItem('lh_user') || '{}'),
			...data,
		};
		localStorage.setItem('lh_user', JSON.stringify(merged));
		return merged;
	},
);

export const deleteAccount = createAsyncThunk(
	'auth/deleteAccount',
	async () => {
		await api.delete('/user');
		return true;
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: storedUser ? JSON.parse(storedUser) : null,
		loading: false,
		error: '',
	},
	reducers: {
		logout(state) {
			state.user = null;
			tokenStore.clear();
			localStorage.removeItem('lh_user');
			localStorage.removeItem('lh_refresh_token');
		},
	},
	extraReducers: builder => {
		builder
			.addCase(signup.pending, state => {
				state.loading = true;
				state.error = '';
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Signup failed';
			})
			.addCase(login.pending, state => {
				state.loading = true;
				state.error = '';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Login failed';
			})
			.addCase(fetchProfile.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(deleteAccount.fulfilled, state => {
				state.user = null;
				tokenStore.clear();
				localStorage.removeItem('lh_user');
				localStorage.removeItem('lh_refresh_token');
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
