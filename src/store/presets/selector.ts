import { selector } from 'recoil';

import { packsState, gptState } from './atoms.ts';
import { Pack } from './types.ts';

export const getPacks = selector<Pack[]>({
	key: 'getPacks',
	get: ({ get }) => get(packsState),
});

export const getApiKey = selector<string>({
	key: 'getApiKey',
	get: ({ get }) => get(gptState),
});
