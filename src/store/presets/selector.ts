import { selector } from 'recoil';

import { packsState } from './atoms.ts';

export const getPacks = selector({
	key: 'getPacks',
	get: ({ get }) => get(packsState),
});
