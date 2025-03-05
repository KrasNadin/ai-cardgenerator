import { EditOutlined } from '@ant-design/icons';
import { Space, Input, Button, InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';

type Props = {
	saveChange: (text: string) => void;
	buttonVariant?: 'save' | 'check';
	text?: string;
};

export default function SavedInput({ saveChange, buttonVariant = 'save', text }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState(false);
	const inputRef = useRef<InputRef>(null);

	const buttonVariants = {
		save: isEditing ? 'Save' : <EditOutlined />,
		check: 'Check',
	};

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			setError(false);
		}
	}, [isEditing]);

	const handleSave = () => {
		const value = inputRef.current?.input?.value || '';
		if (isEditing) {
			if (value.length == 0) {
				setError(true);
			} else {
				saveChange(value);
			}
		}
		setIsEditing(!isEditing);
	};

	return (
		<>
			<Space.Compact block>
				<Input
					onFocus={() => setIsEditing(true)}
					ref={inputRef}
					style={{ width: '80%', height: '40px' }}
					count={{
						show: buttonVariant == 'check' ? false : true,
						max: 300,
					}}
					defaultValue={text}
					placeholder={buttonVariant === 'check' ? 'Place for GPT api key' : 'Write your title'}
					status={error ? 'error' : ''}
				/>
				<Button type={buttonVariant === 'check' ? 'primary' : 'default'} style={{ width: '20%', height: '40px' }} onClick={handleSave}>
					{buttonVariants[buttonVariant]}
				</Button>
			</Space.Compact>
		</>
	);
}
