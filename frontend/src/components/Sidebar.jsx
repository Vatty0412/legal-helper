export function Sidebar({ chats, activeChatId, onSelectChat, onNewChat }) {
	return (
		<aside className="glass rounded-2xl p-4 h-[75vh] overflow-y-auto">
			<button
				className="w-full mb-4 rounded-xl bg-dusk text-white py-2 hover:bg-slate-700 transition"
				onClick={onNewChat}
			>
				+ New Session
			</button>
			<div className="space-y-2">
				{chats.map(chat => (
					<button
						key={chat._id}
						onClick={() => onSelectChat(chat._id)}
						className={`w-full text-left p-3 rounded-lg text-sm transition ${
							activeChatId === chat._id ?
								'bg-orange-100 border border-orange-300'
							:	'bg-white hover:bg-slate-50'
						}`}
					>
						<p className="font-semibold truncate">{chat.title}</p>
					</button>
				))}
			</div>
		</aside>
	);
}
