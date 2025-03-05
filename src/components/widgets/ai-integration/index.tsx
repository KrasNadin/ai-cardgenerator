import { Flex, Typography } from 'antd';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import SavedInput from '@/components/ui/saved-input';
import { gptState, useGptActions } from '@/store/presets/atoms';

const { Text, Link } = Typography;

export default function AiIntagration() {
	const { setGptKey } = useGptActions();
	const [key] = useRecoilState(gptState);

	const handleCheck = useCallback(
		(key: string) => {
			setGptKey(key);
			console.log(key);
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
			</Flex>
		</Flex>
	);
}
