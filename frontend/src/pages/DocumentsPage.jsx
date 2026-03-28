import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileUploader } from '../components/FileUploader';
import {
	fetchDocuments,
	retryDocument,
	uploadDocument,
} from '../features/documents/documentSlice';

export function DocumentsPage() {
	const dispatch = useDispatch();
	const { items, loading, uploadState } = useSelector(s => s.documents);

	useEffect(() => {
		dispatch(fetchDocuments());
	}, [dispatch]);

	const handleUpload = async file => {
		if (!file) return;
		await dispatch(uploadDocument(file));
		dispatch(fetchDocuments());
	};

	return (
		<main className="max-w-6xl mx-auto p-4 space-y-4">
			<FileUploader
				onUpload={handleUpload}
				loading={uploadState === 'uploading'}
			/>
			<section className="glass rounded-2xl p-4">
				<div className="flex items-center justify-between mb-3">
					<h2 className="font-display text-2xl">Document Status</h2>
					<button
						className="text-sm underline"
						onClick={() => dispatch(fetchDocuments())}
					>
						Refresh
					</button>
				</div>
				{loading ?
					<p>Loading...</p>
				:	null}
				<div className="space-y-2">
					{items.map(doc => (
						<div
							key={doc._id}
							className="border rounded-xl p-3 bg-white flex items-center justify-between"
						>
							<div>
								<p className="font-semibold">
									{doc.originalName}
								</p>
								<p className="text-xs text-slate-600">
									status: {doc.status} | retries:{' '}
									{doc.retryCount || 0}
								</p>
								{doc.lastError ?
									<p className="text-xs text-red-600">
										{doc.lastError}
									</p>
								:	null}
							</div>
							<button
								className="rounded-lg border px-3 py-1 disabled:opacity-50"
								onClick={() => dispatch(retryDocument(doc._id))}
								disabled={doc.status === 'processing'}
							>
								Retry
							</button>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
