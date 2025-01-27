import { Flex, Typography } from 'antd';

import CopyButton from '@/components/ui/copy-button';

const { Text } = Typography;

type Props = {
	code: string;
};

export default function CodeSnipped({ code }: Props) {
	return (
		<Flex className='codeSnipped'>
			<Text
				style={{
					flex: 1,
					overflow: 'auto',
					fontFamily: 'monospace',
					fontSize: 'x-small',
					whiteSpace: 'pre-wrap',
				}}>
				{code}
			</Text>
			<CopyButton text={code} />
		</Flex>
	);
}
