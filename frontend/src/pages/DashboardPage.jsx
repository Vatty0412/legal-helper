import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function DashboardPage() {
	const user = useSelector(s => s.auth.user);

	return (
		<main className="p-6 max-w-6xl mx-auto">
			<section className="glass rounded-3xl p-8 fade-up">
				<h1 className="font-display text-4xl">
					Hello, {user?.name || 'Counsel'}
				</h1>
				<p className="mt-2 text-slate-700">
					Use your workspace to manage legal documents and run
					citation-aware AI conversations.
				</p>
				<div className="grid sm:grid-cols-3 gap-4 mt-6">
					<Link
						to="/chat"
						className="rounded-2xl bg-white p-4 border"
					>
						Open Chat Workspace
					</Link>
					<Link
						to="/documents"
						className="rounded-2xl bg-white p-4 border"
					>
						Manage Documents
					</Link>
					<Link
						to="/profile"
						className="rounded-2xl bg-white p-4 border"
					>
						Profile & Sessions
					</Link>
				</div>
			</section>
		</main>
	);
}
