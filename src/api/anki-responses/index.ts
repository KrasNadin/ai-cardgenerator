import axios from 'axios';

const apiKey = 'ankipowerapp';
const apiUrl = 'http://localhost:8765';

export async function checkAnkiConnection() {
	try {
		const response = await axios.post(apiUrl, {
			action: 'deckNames',
			version: 6,
			key: apiKey,
		});
		console.log('Anki Connection successful');
		return response.data.result;
	} catch (e) {
		console.log('Failed to connect to Anki ', e);
	}
}

export async function addCardToAnki(deckName: string, front: string, back: string, tags: string[]) {
	const payload = {
		action: 'addNote',
		version: 6,
		key: apiKey,
		params: {
			note: {
				deckName: deckName,
				modelName: 'Basic',
				fields: {
					Front: front,
					Back: back,
				},
				tags: tags,
				options: {
					allowDuplicate: false,
				},
			},
		},
	};

	try {
		const res = await axios.post(apiUrl, payload);
		console.log('Added to Anki, ID:', res.data.result);
		return true;
	} catch (e) {
		console.error('Error while adding', e);
		return false;
	}
}
