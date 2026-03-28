import { useRef } from 'react';

export function FileUploader({ onUpload, loading }) {
	const inputRef = useRef(null);

	return (
		<div className="glass rounded-2xl p-4">
			<h3 className="font-display text-lg mb-2">Document Ingestion</h3>
			<p className="text-sm text-slate-600 mb-3">
				Upload PDF or DOCX files for citation-grounded answers.
			</p>
			<input
				ref={inputRef}
				type="file"
				accept=".pdf,.docx"
				className="hidden"
				onChange={e => onUpload(e.target.files?.[0])}
			/>
			<button
				className="rounded-lg bg-mint text-white px-4 py-2 disabled:opacity-60"
				onClick={() => inputRef.current?.click()}
				disabled={loading}
			>
				{loading ? 'Uploading...' : 'Upload File'}
			</button>
		</div>
	);
}
