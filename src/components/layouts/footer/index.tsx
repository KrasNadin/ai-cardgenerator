import { SettingOutlined, ProductOutlined, TranslationOutlined, QuestionOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { useNavigate } from 'react-router';

export default function Footer() {
	const navigate = useNavigate();
	return (
		<Flex justify='space-between' align='center' style={{ height: '100%' }}>
			<SettingOutlined className='mainIcon' onClick={() => navigate('/')} />
			<ProductOutlined className='mainIcon' onClick={() => navigate('/packs')} />
			<TranslationOutlined className='mainIcon' onClick={() => navigate('/generate')} />
			<QuestionOutlined className='mainIcon' />
		</Flex>
	);
}
