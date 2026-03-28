import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { env } from '../config/env.js';

const client = axios.create({
	baseURL: env.aiServiceUrl,
	timeout: 60000,
});

export async function requestChat(payload) {
	const { data } = await client.post('/chat', payload);
	return data;
}

export async function requestDocumentChat(payload) {
	const { data } = await client.post('/pdf/chat', payload);
	return data;
}

export async function uploadToAiService({
	filePath,
	fileId,
	userId,
	checksum,
}) {
	const form = new FormData();
	form.append('file', fs.createReadStream(filePath));
	form.append('file_id', fileId);
	form.append('user_id', userId);
	form.append('checksum', checksum);

	const { data } = await client.post('/upload', form, {
		headers: form.getHeaders(),
	});
	return data;
}
