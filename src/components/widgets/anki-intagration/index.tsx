import { Flex, Button, Typography } from 'antd';
import { useState } from 'react';

import { checkAnkiConnection } from '@/api/anki-responses';
import CodeSnipped from '@/components/stateless/code-snipped';
import { renderCheckStatus } from '@/components/ui/check-status';

const { Text, Link } = Typography;

const ankiSettings = JSON.stringify(
	{
		apiKey: 'ankipowerapp',
		webCorsOriginList: ['http://localhost', '*'],
		webBindPort: 8765,
	},
	null,
	'    '
);

export default function AnkiIntagration() {
	const [checkStatus, setCheckStatus] = useState('waiting');

	const handleCheckAnkiConnection = async () => {
		setCheckStatus('checking');
		const isChecked = await checkAnkiConnection();
		if (isChecked) {
			setCheckStatus('success');
		} else {
			setCheckStatus('error');
			console.warn('Invalid API key. Update cancelled.');
		}
	};

	return (
		<Flex vertical gap='middle'>
			<Flex vertical>
				<Text>
					1. Install Anki from{' '}
					<Link href='https://apps.ankiweb.net/' target='_blank'>
						here
					</Link>{' '}
					(official site)
				</Text>
				<Text>2. Open anki and Go to Tools then Addons then Get Add-ons</Text>
				<Text>
					3. Copy paste the addon id:{' '}
					<Text copyable={{ text: '2055492159' }} code>
						{' '}
						2055492159{' '}
					</Text>
				</Text>
				<Text>4. Restart Anki</Text>
				<Text>5. Go to Tools then Addons then AnkiConnect then Config it</Text>
				<Text>6. Copy paste the following config, you can change the apiKey:</Text>
			</Flex>
			<CodeSnipped code={ankiSettings} />
			<Flex gap='middle'>
				<Button color='primary' variant='solid' style={{ width: '100px' }} onClick={handleCheckAnkiConnection}>
					Check
				</Button>
				{renderCheckStatus(checkStatus)}
			</Flex>
		</Flex>
	);
}
