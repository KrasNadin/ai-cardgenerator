import { atom, useRecoilState, useSetRecoilState } from 'recoil';

import { localStorageEffect } from './effects';
import { Pack, DefaultInfo, Preset, Card } from './types';

export const randomId = (prefix: string = '') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const packsState = atom<Pack[]>({
	key: 'packs',
	default: [],
	effects: [localStorageEffect('packs')],
});

export const usePacksActions = () => {
	const [packs, setPacks] = useRecoilState(packsState);

	const addPack = ({ id, title }: DefaultInfo) => {
		setPacks((prevPacks) => [...prevPacks, { id, title, presets: [] }]);
	};

	const deletePack = (packId: string) => {
		setPacks((prevPacks) => {
			return prevPacks.filter((pack) => pack.id !== packId);
		});
	};

	const addPresetToPack = (presetInfo: Preset, packId: string) => {
		setPacks((prevPacks) => {
			const packIndex = prevPacks.findIndex((pack) => pack.id === packId);

			return prevPacks.map((pack, index) =>
				index === packIndex
					? {
							...pack,
							presets: [
								...pack.presets,
								{
									...presetInfo,
								},
							],
						}
					: pack
			);
		});
	};

	const updatePreset = (packId: string, presetId: string, payload: Partial<Preset>) => {
		setPacks((prevPacks) => {
			const packIndex = prevPacks.findIndex((pack) => pack.id === packId);

			return prevPacks.map((pack, index) =>
				index === packIndex
					? {
							...pack,
							presets: pack.presets.map((preset) => (preset.id === presetId ? { ...preset, ...payload } : preset)),
						}
					: pack
			);
		});
	};

	const deletePreset = (packId: string, presetId: string) => {
		setPacks((prevPacks) => {
			const packIndex = prevPacks.findIndex((pack) => pack.id === packId);

			return prevPacks.map((pack, index) =>
				index === packIndex
					? {
							...pack,
							presets: pack.presets.filter((preset) => preset.id !== presetId),
						}
					: pack
			);
		});
	};

	const updatePack = (id: string, payload: Partial<Pack>) => {
		const updatedPacks = packs.map((pack) => {
			if (pack.id === id) {
				return { ...pack, ...payload };
			}
			return pack;
		});

		setPacks(updatedPacks);
	};

	return { addPack, addPresetToPack, updatePreset, updatePack, deletePreset, deletePack };
};

export const userCards = atom<Card[]>({
	key: 'userCard',
	default: [],
	effects: [localStorageEffect('userCards')],
});

export const useUserCards = () => {
	const [cards, setCards] = useRecoilState(userCards);

	const addCard = (newCards: Card[]) => {
		setCards((prevCards) => [...prevCards, ...newCards]);
	};

	const deleteCard = (key: string) => {
		setCards((prevCards) => {
			return prevCards.filter((card) => card.key !== key);
		});
	};

	const editCard = (key: string, payload: Partial<Card>) => {
		const editedCards = cards.map((card) => {
			if (card.key === key) {
				console.log('hui');
				return { ...card, ...payload };
			}
			return card;
		});

		setCards(editedCards);
	};

	return { addCard, deleteCard, editCard };
};

export const gptState = atom<string>({
	key: 'gptKey',
	default: '',
	effects: [localStorageEffect('gptKey')],
});

export const useGptActions = () => {
	const setKey = useSetRecoilState(gptState);

	const setGptKey = (apiKey: string) => {
		setKey(apiKey);
	};

	return { setGptKey };
};
