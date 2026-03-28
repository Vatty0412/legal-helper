import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../services/api';
import { Sidebar } from '../components/Sidebar';
import { ChatWindow } from '../components/ChatWindow';
import { MessageComposer } from '../components/MessageComposer';
import {
	appendUserMessage,
	createChat,
	fetchChat,
	sendMessage,
} from '../features/chat/chatSlice';

export function ChatPage() {
	const dispatch = useDispatch();
	const { currentChat, messages, thinking } = useSelector(s => s.chat);
	const [chats, setChats] = useState([]);

	const loadChats = async () => {
		const { data } = await api.get('/chat');
		setChats(data);
	};

	useEffect(() => {
		loadChats();
	}, []);

	const onNewChat = async () => {
		const result = await dispatch(createChat({ title: 'New Chat' }));
		if (!result.error) {
			await loadChats();
			dispatch(fetchChat(result.payload._id));
		}
	};

	const onSelectChat = id => {
		dispatch(fetchChat(id));
	};

	const onSend = async content => {
		let activeChatId = currentChat?._id;
		if (!activeChatId) {
			const result = await dispatch(createChat({ title: 'New Chat' }));
			if (result.error) return;
			activeChatId = result.payload._id;
			await loadChats();
		}

		dispatch(
			appendUserMessage({
				_id: `tmp-${Date.now()}`,
				role: 'user',
				content,
			}),
		);
		await dispatch(
			sendMessage({
				chatId: activeChatId,
				payload: { content, useRag: true },
			}),
		);
		await dispatch(fetchChat(activeChatId));
		await loadChats();
	};

	return (
		<main className="p-4 max-w-7xl mx-auto grid md:grid-cols-[280px_1fr] gap-4">
			<Sidebar
				chats={chats}
				activeChatId={currentChat?._id}
				onSelectChat={onSelectChat}
				onNewChat={onNewChat}
			/>
			<section>
				<ChatWindow messages={messages} thinking={thinking} />
				<MessageComposer onSend={onSend} disabled={thinking} />
			</section>
		</main>
	);
}
