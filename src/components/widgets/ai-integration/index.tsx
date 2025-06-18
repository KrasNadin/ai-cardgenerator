import { Flex, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import { checkApiKey } from '@/api/gpt-responses';
import { renderCheckStatus } from '@/components/ui/check-status';
import SavedInput from '@/components/ui/saved-input';
import { gptState, useGptActions } from '@/store/presets/atoms';

const { Text, Link } = Typography;

export default function AiIntagration() {
	const { setGptKey } = useGptActions();
	const [key] = useRecoilState(gptState);
	const [checkStatus, setCheckStatus] = useState('waiting');

	const handleCheck = useCallback(
		async (key: string) => {
			setCheckStatus('checking');
			const isChecked = await checkApiKey(key);
			if (isChecked) {
				setGptKey(key);
				setCheckStatus('success');
			} else {
				setCheckStatus('error');
				console.warn('Invalid API key. Update cancelled.');
			}
		},
		[setGptKey]
	);

	return (
		<Flex vertical gap='middle'>
			<Flex vertical>
				<Text>
					1. Go to your{' '}
					<Link href='https://chat.openai.com/' target='_blank'>
						ChatGPT account
					</Link>{' '}
					and copy api key.
				</Text>
				<Text>2. Paste your api key here:</Text>
			</Flex>
			<Flex gap='middle'>
				<SavedInput saveChange={handleCheck} buttonVariant={'check'} text={key} />
				<div style={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{renderCheckStatus(checkStatus)}</div>
			</Flex>
		</Flex>
	);
}
