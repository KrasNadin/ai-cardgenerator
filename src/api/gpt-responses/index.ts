import axios from 'axios';

const apiUrl = 'https://api.openai.com/v1/chat/completions';

export async function checkApiKey(apiKey: string): Promise<boolean> {
	try {
		if (!apiKey) {
			console.warn('API-ключ не указан.');
			return false;
		}

		const response = await axios.post(
			apiUrl,
			{
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: 'ping' }],
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`,
				},
			}
		);

		return response.status === 200;
	} catch (error: any) {
		if (axios.isAxiosError(error) && error.response) {
			if (error.response.status === 401 || error.response.status === 403) {
				console.warn('API-ключ недействителен или запрещен.');
				return false;
			}
		}
		console.error('Ошибка при проверке API-ключа:', error);
		return false;
	}
}

export async function getChatGptResponse(prompt: string, apiKey: string): Promise<string | null> {
	try {
		const response = await axios.post(
			apiUrl,
			{
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`,
				},
			}
		);

		return response.data.choices[0].message.content;
	} catch (error) {
		console.error('Ошибка при запросе к OpenAI:', error);
		return null;
	}
}
