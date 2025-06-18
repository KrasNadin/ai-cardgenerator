import { SnippetsOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';

type PasteInputProps = {
	setWord?: (value: string) => void;
};

export function PasteInput({ setWord }: PasteInputProps) {
	const [text, setText] = useState('');

	const handlePaste = useCallback(async () => {
		try {
			const clipboardText = await navigator.clipboard.readText();
			setText(clipboardText);
			setWord?.(clipboardText);
		} catch (err) {
			console.error('Failed to read clipboard:', err);
		}
	}, [setWord]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setText(value);
		setWord?.(value);
	};

	return (
		<>
			<Input.TextArea
				value={text}
				placeholder='Write text for card'
				allowClear
				onChange={handleChange}
				autoSize={{ minRows: 2, maxRows: 6 }}
				style={{
					paddingLeft: '50px',
				}}
			/>
			<Button
				type='text'
				onClick={handlePaste}
				style={{
					position: 'absolute',
					left: '8px',
					marginTop: '3px',
					top: '50%',
					transform: 'translateY(-50%)',
					zIndex: 10,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'transparent',
					border: 'none',
					padding: '4px',
					fontSize: '12px',
					lineHeight: '1',
				}}>
				<SnippetsOutlined style={{ color: 'grey', fontSize: '16px' }} />
				<span style={{ marginTop: '1px', color: 'grey' }}>Paste</span>
			</Button>
		</>
	);
}
