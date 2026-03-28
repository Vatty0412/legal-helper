import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

export function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector(s => s.auth);
	const [form, setForm] = useState({ email: '', password: '' });

	const onSubmit = async e => {
		e.preventDefault();
		const result = await dispatch(login(form));
		if (!result.error) navigate('/dashboard');
	};

	return (
		<main className="min-h-screen grid place-items-center px-4">
			<form
				onSubmit={onSubmit}
				className="glass rounded-2xl p-8 w-full max-w-md space-y-4"
			>
				<h1 className="font-display text-3xl">Welcome back</h1>
				<input
					className="w-full rounded-lg border p-3"
					placeholder="Email"
					type="email"
					value={form.email}
					onChange={e => setForm({ ...form, email: e.target.value })}
				/>
				<input
					className="w-full rounded-lg border p-3"
					placeholder="Password"
					type="password"
					value={form.password}
					onChange={e =>
						setForm({ ...form, password: e.target.value })
					}
				/>
				{error && <p className="text-red-600 text-sm">{error}</p>}
				<button
					className="w-full rounded-lg bg-dusk text-white py-3"
					disabled={loading}
				>
					Login
				</button>
				<p className="text-sm">
					New user?{' '}
					<Link className="text-blaze" to="/signup">
						Sign up
					</Link>
				</p>
			</form>
		</main>
	);
}
