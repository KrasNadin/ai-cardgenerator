import { Layout, ConfigProvider, theme } from 'antd';

import '../index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from '@/app/routes';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

const { Header: AntdHeader, Content: AntdContend, Footer: AntdFooter } = Layout;

export default function App() {
	return (
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			<Layout style={{ height: '100vh' }}>
				<BrowserRouter>
					<AntdHeader>
						<Header />
					</AntdHeader>
					<AntdContend style={{ padding: '15px 48px', overflowY: 'auto' }}>
						<Routes>
							{routes.map((route, i) => (
								<Route key={i} path={route.path} element={<route.component routes={route.routes} />} />
							))}
						</Routes>
					</AntdContend>
					<AntdFooter>
						<Footer />
					</AntdFooter>
				</BrowserRouter>
			</Layout>
		</ConfigProvider>
	);
}
