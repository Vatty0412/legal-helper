import { useState } from 'react';

export function MessageComposer({ onSend, disabled }) {
	const [value, setValue] = useState('');

	const submit = e => {
		e.preventDefault();
		if (!value.trim()) return;
		onSend(value.trim());
		setValue('');
	};

	return (
		<form className="mt-3 flex gap-2" onSubmit={submit}>
			<input
				className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
				placeholder="Ask a legal question..."
				value={value}
				onChange={e => setValue(e.target.value)}
				disabled={disabled}
			/>
			<button
				className="rounded-xl bg-blaze text-white px-5 py-3 disabled:opacity-50"
				disabled={disabled}
			>
				Send
			</button>
		</form>
	);
}
