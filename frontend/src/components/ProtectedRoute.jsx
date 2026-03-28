import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
	const devBypass = import.meta.env.VITE_DEV_AUTH_BYPASS === 'true';
	const user = useSelector(s => s.auth.user);
	if (devBypass) {
		return children;
	}
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
}
