import { AtomEffect } from 'recoil';

export const localStorageEffect =
	<T>(key: string): AtomEffect<T> =>
	({ setSelf, onSet, trigger }) => {
		if (trigger === 'get') {
			const savedValue = localStorage.getItem(key);
			if (savedValue !== null) {
				try {
					setSelf(JSON.parse(savedValue) as T);
				} catch (error) {
					console.error(`Error parsing localStorage value for key "${key}":`, error);
				}
			}
		}

		onSet((newValue, _, isReset) => {
			if (isReset) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, JSON.stringify(newValue));
			}
		});

		return undefined;
	};
