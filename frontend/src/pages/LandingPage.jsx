import { Link } from 'react-router-dom';

export function LandingPage() {
	return (
		<main className="min-h-screen grid place-items-center px-4">
			<section className="glass max-w-4xl w-full rounded-3xl p-10 fade-up">
				<p className="text-sm font-semibold uppercase tracking-widest text-blaze">
					AI + Legal Workflow
				</p>
				<h1 className="font-display text-5xl mt-3 leading-tight">
					Legal Helper for research, drafting, and document-grounded
					chat
				</h1>
				<p className="mt-5 text-slate-700 max-w-2xl">
					Production-grade legal assistant with secure auth,
					citation-backed RAG, and end-to-end document ingestion
					tracking.
				</p>
				<div className="mt-8 flex gap-3">
					<Link
						to="/signup"
						className="rounded-xl bg-dusk text-white px-6 py-3"
					>
						Create account
					</Link>
					<Link
						to="/login"
						className="rounded-xl border border-slate-400 px-6 py-3"
					>
						Sign in
					</Link>
				</div>
			</section>
		</main>
	);
}
