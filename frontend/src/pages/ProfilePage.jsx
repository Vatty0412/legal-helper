import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAccount,
	logout,
	updateProfile,
} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
	const user = useSelector(s => s.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState(user?.name || '');
	const [avatar, setAvatar] = useState(user?.avatar || '');

	const save = async e => {
		e.preventDefault();
		await dispatch(updateProfile({ name, avatar }));
	};

	const remove = async () => {
		await dispatch(deleteAccount());
		navigate('/signup');
	};

	return (
		<main className="max-w-3xl mx-auto p-4">
			<form onSubmit={save} className="glass rounded-2xl p-6 space-y-4">
				<h1 className="font-display text-3xl">Profile</h1>
				<p className="text-sm text-slate-600">Email: {user?.email}</p>
				<input
					className="w-full rounded-lg border p-3"
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="Name"
				/>
				<input
					className="w-full rounded-lg border p-3"
					value={avatar}
					onChange={e => setAvatar(e.target.value)}
					placeholder="Avatar URL"
				/>
				<div className="flex gap-2">
					<button className="rounded-lg bg-dusk text-white px-4 py-2">
						Save
					</button>
					<button
						type="button"
						className="rounded-lg border px-4 py-2"
						onClick={() => dispatch(logout())}
					>
						Logout
					</button>
					<button
						type="button"
						className="rounded-lg border border-red-400 text-red-600 px-4 py-2"
						onClick={remove}
					>
						Delete Account
					</button>
				</div>
			</form>
		</main>
	);
}
