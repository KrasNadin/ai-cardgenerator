import { FC } from 'react';
import { Route } from 'react-router-dom';

import CardGenerator from '@/components/pages/cards-generator';
import Pack from '@/components/pages/pack-editing';
import PresetEditing from '@/components/pages/preset-editing';
import PresetPacks from '@/components/pages/preset-packs';
import Settings from '@/components/pages/settings';

type RouteWithSubRoutesType<T = unknown> = {
	path: string;
	title: string;
	component: FC<T & { routes?: RouteWithSubRoutesType[] }>;
	routes?: RouteWithSubRoutesType[];
	children?: RouteWithSubRoutesType[];
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
	{
		path: 'pack/:packId',
		title: 'Pack Setting',
		component: Pack,
	},
	{
		path: 'pack/:packId/:presetId',
		title: 'Preset Setting',
		component: PresetEditing,
	},
	{
		path: '/pack',
		title: 'Create new pack',
		component: Pack,
	},
	{
		path: '/generate',
		title: 'Time for Card Generate',
		component: CardGenerator,
	},
];

export const renderRoutes = (routes: RouteWithSubRoutesType[]) => {
	return (
		<>
			{routes.map((route, i) => (
				<Route key={i} path={route.path} element={<route.component routes={route.routes} />}>
					{route.children && renderRoutes(route.children)}
				</Route>
			))}
		</>
	);
};
