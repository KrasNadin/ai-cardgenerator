import { selector } from 'recoil';

import { packsState } from './atoms.ts';
import { Pack } from './types.ts';

export const getPacks = selector<Pack[]>({
	key: 'getPacks',
	get: ({ get }) => get(packsState),
});
