import { Layout, ConfigProvider, theme } from 'antd';
import '../index.scss';
import { BrowserRouter, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes, renderRoutes } from '@/app/routes';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

const { Header: AntdHeader, Content: AntdContend, Footer: AntdFooter } = Layout;

export default function App() {
	return (
		<RecoilRoot>
			<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
				<Layout style={{ height: '100vh' }}>
					<BrowserRouter>
						<AntdHeader>
							<Header />
						</AntdHeader>
						<AntdContend style={{ padding: '15px 48px', overflowY: 'auto' }}>
							<Routes>{renderRoutes(routes)}</Routes>
						</AntdContend>
						<AntdFooter>
							<Footer />
						</AntdFooter>
					</BrowserRouter>
				</Layout>
			</ConfigProvider>
		</RecoilRoot>
	);
}
