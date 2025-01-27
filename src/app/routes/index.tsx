import { FC } from 'react';

import PresetPacks from '@/components/pages/preset-packs';
import Settings from '@/components/pages/settings';

type RouteWithSubRoutesType<T = unknown> = {
	path: string;
	title: string;
	component: FC<T & { routes?: RouteWithSubRoutesType[] }>;
	routes?: RouteWithSubRoutesType[];
};

export const routes: RouteWithSubRoutesType[] = [
	{
		path: '/',
		title: 'Settings',
		component: Settings,
	},
	{
		path: '/packs',
		title: 'Preset Packs',
		component: PresetPacks,
	},
	// {
	//   path: "/tacos",
	//   component: Tacos,
	//   routes: [
	//     {
	//       path: "/tacos/bus",
	//       component: Bus
	//     },
	//     {
	//       path: "/tacos/cart",
	//       component: Cart
	//     }
	//   ]
	// }
];
