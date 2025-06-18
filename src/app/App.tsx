import { Layout, ConfigProvider, theme } from 'antd';
import '../index.scss';
import { useState } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes, renderRoutes } from '@/app/routes';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

const { Header: AntdHeader, Content: AntdContend, Footer: AntdFooter } = Layout;

const darkCustom = {
	Layout: { headerBg: '	#000a26' },
};
const lightCustom = {
	Layout: { headerBg: '#e8f0f5' },
};

export default function App() {
	const [mode, setMode] = useState<'light' | 'dark'>('dark');

	return (
		<RecoilRoot>
			<ConfigProvider
				theme={{
					algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
					components: mode === 'dark' ? darkCustom : lightCustom,
				}}>
				<Layout style={{ height: '100vh' }}>
					<BrowserRouter>
						<AntdHeader>
							<Header setTheme={setMode} currentTheme={mode} />
						</AntdHeader>
						<AntdContend style={{ padding: '15px 48px', overflowY: 'auto' }}>
							<div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
								<Routes>{renderRoutes(routes)}</Routes>
							</div>
						</AntdContend>
						<AntdFooter>
							<div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
								<Footer />
							</div>
						</AntdFooter>
					</BrowserRouter>
				</Layout>
			</ConfigProvider>
		</RecoilRoot>
	);
}
