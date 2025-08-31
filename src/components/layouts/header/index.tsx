import { RocketOutlined, SunOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

import { routes } from '@/app/routes';

const { Title } = Typography;

type Props = {
	setTheme: (mode: 'light' | 'dark') => void;
	currentTheme: 'light' | 'dark';
};

export default function Header({ setTheme, currentTheme }: Props) {
	const location = useLocation();

	const currentRoute = routes.find((route) => route.path === location.pathname);
	const title = currentRoute ? currentRoute.title : 'Default Title';

	const toggleTheme = () => {
		setTheme(currentTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<Flex justify='space-between' align='center' style={{ height: '100%', margin: '0 auto', maxWidth: '500px' }}>
			<RocketOutlined className='mainIcon' />
			<Title level={4} style={{ margin: 0 }}>
				{title}
			</Title>
			<button onClick={toggleTheme} style={{ all: 'unset', cursor: 'pointer' }}>
				<SunOutlined className='mainIcon' />
			</button>
		</Flex>
	);
}
