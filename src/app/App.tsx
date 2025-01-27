import { Layout, ConfigProvider, theme } from "antd"
import '../index.scss'
import Settings from "@/components/pages/settings"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"

const { Header: AntdHeader, Content: AntdContend, Footer: AntdFooter } = Layout

export default function App() {
	return (
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			<Layout style = {{ height: '100vh'}}>
				<AntdHeader>
					<Header/>
				</AntdHeader>
				<AntdContend style = {{ padding: '15px 48px', overflowY: "auto",}}>
					<Settings/>
				</AntdContend>
				<AntdFooter>
					<Footer/>
				</AntdFooter>
			</Layout>
		</ConfigProvider>
	)
}
