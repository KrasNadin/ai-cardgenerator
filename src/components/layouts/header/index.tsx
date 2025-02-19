import { SlackOutlined, SunOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

import { routes } from '@/app/routes';

const { Title } = Typography;

export default function Header() {
	const location = useLocation();

	const currentRoute = routes.find((route) => route.path === location.pathname);
	const title = currentRoute ? currentRoute.title : 'Default Title';

	return (
		<Flex justify='space-between' align='center' style={{ height: '100%' }}>
			<SlackOutlined className='mainIcon' />
			<Title level={4} style={{ margin: 0 }}>
				{title}
			</Title>
			<SunOutlined className='mainIcon' />
		</Flex>
	);
}
