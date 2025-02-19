import { atom, useRecoilState } from 'recoil';

import { Pack, DefaultInfo, Preset } from './types';

export const randomId = (prefix: string = '') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const packsState = atom<Pack[]>({
	key: 'packs',
	default: [],
});

export const usePacksActions = () => {
	const [packs, setPacks] = useRecoilState(packsState);

	const addPack = ({ id, title }: DefaultInfo) => {
		setPacks((prevPacks) => [...prevPacks, { id, title, presets: [] }]);
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

	const updatePack = (id: string, payload: Partial<Pack>) => {
		const updatedPacks = packs.map((pack) => {
			if (pack.id === id) {
				return { ...pack, ...payload };
			}
			return pack;
		});

		setPacks(updatedPacks);
	};

	return { addPack, addPresetToPack, updatePreset, updatePack };
};
