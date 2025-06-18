import { useState } from 'react';

import { getChatGptResponse } from '@/api/gpt-responses';
import { randomId } from '@/store/presets/atoms';
import { Preset, Card } from '@/store/presets/types';

export const useGenerateCards = (apiKey: string) => {
	const [loading, setLoading] = useState(false);

	const generatedCard = async (preset: Preset, word: string): Promise<Card | null> => {
		setLoading(true);

		try {
			const [frontResponse, backResponse] = await Promise.all([
				getChatGptResponse(`${preset.frontPrompts?.text}. Make it for word: ${word}`, apiKey),
				getChatGptResponse(`${preset.backPrompts?.text}. Make it for word: ${word}`, apiKey),
			]);

			if (!frontResponse || !backResponse) return null;

			return {
				key: randomId('userCard-'),
				frontSide: { text: frontResponse },
				backSide: { text: backResponse },
			};
		} catch (error) {
			console.error('Ups! Something went wrong:', error);
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { generatedCard, loading };
};
