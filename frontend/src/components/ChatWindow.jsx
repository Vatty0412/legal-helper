export function ChatWindow({ messages, thinking }) {
	return (
		<div className="glass rounded-2xl p-4 h-[60vh] overflow-y-auto space-y-3">
			{messages.map(msg => (
				<div
					key={msg._id || Math.random()}
					className={`fade-up ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
				>
					<div
						className={`inline-block max-w-[85%] rounded-2xl p-3 ${msg.role === 'user' ? 'bg-dusk text-white' : 'bg-white'}`}
					>
						<p className="whitespace-pre-wrap">{msg.content}</p>
						{msg.role === 'assistant' &&
							msg.citations?.length > 0 && (
								<div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-600">
									<p className="font-semibold mb-1">
										Citations
									</p>
									{msg.citations.map((c, idx) => (
										<p
											key={`${c.documentId}-${c.chunkId}-${idx}`}
										>
											[{idx + 1}] Doc {c.documentId} chunk{' '}
											{c.chunkId} score{' '}
											{Number(c.score || 0).toFixed(2)}
										</p>
									))}
								</div>
							)}
					</div>
				</div>
			))}
			{thinking && (
				<div className="text-sm text-slate-600 animate-pulse">
					Legal Helper is analyzing retrieved legal context...
				</div>
			)}
		</div>
	);
}
