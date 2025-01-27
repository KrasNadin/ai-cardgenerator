import { CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState, useCallback } from 'react';

type Props = {
	text: string;
};

export default function CopyButton({ text }: Props) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	}, [text]);

	return (
		<Tooltip title='Copied!' open={isCopied}>
			<Button type='text' onClick={handleCopy}>
				<CopyOutlined />
			</Button>
		</Tooltip>
	);
}
