import { Input } from 'antd';
import { useState } from 'react';

type Props = {
	prompt: string;
	changePrompt: (value: string) => void;
};

export default function PromptArea({ prompt, changePrompt }: Props) {
	const [text, setText] = useState(prompt);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setText(newValue);
		changePrompt(newValue);
	};

	return (
		<Input.TextArea
			value={text}
			onChange={handleChange}
			placeholder='Enter prompt for GPT'
			allowClear
			autoSize={{ minRows: 2, maxRows: 4 }}
		/>
	);
}
