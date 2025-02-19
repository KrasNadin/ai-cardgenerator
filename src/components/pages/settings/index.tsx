import { OpenAIOutlined, StarOutlined, ProductOutlined } from '@ant-design/icons';
import { Button, Steps } from 'antd';
import { useNavigate } from 'react-router';

import AiIntagration from '@/components/widgets/ai-integration';
import AnkiIntagration from '@/components/widgets/anki-intagration';

export default function Settings() {
	const navigate = useNavigate();

	return (
		<div>
			<Steps
				direction='vertical'
				items={[
					{
						title: 'Add your chatGPT Api keys',
						description: <AiIntagration />,
						icon: <OpenAIOutlined />,
						status: 'process',
					},
					{
						title: 'Connect to Anki',
						description: <AnkiIntagration />,
						icon: <StarOutlined />,
						status: 'process',
					},
					{
						title: 'Create or update your prompt packs',
						description: (
							<Button onClick={() => navigate('/packs')} type='text' color='primary' variant='solid' style={{ width: '100px' }}>
								Go to packs
							</Button>
						),
						icon: <ProductOutlined />,
						status: 'process',
					},
				]}
			/>
		</div>
	);
}
