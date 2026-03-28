import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ChatPage } from '../pages/ChatPage';
import { DocumentsPage } from '../pages/DocumentsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />

			<Route
				path="/dashboard"
				element={
					//   <ProtectedRoute>
					<DashboardPage />
					//   </ProtectedRoute>
				}
			/>
			<Route
				path="/chat"
				element={
					<ProtectedRoute>
						<ChatPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/documents"
				element={
					<ProtectedRoute>
						<DocumentsPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
