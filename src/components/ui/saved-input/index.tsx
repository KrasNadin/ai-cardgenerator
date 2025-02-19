import { EditOutlined } from '@ant-design/icons';
import { Space, Input, Button, InputRef } from 'antd';
import { useEffect, useRef, useState } from 'react';

type Props = {
	saveChange: (text: string) => void;
};

export default function SavedInput({ saveChange }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState(false);
	const inputRef = useRef<InputRef>(null);

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
						show: true,
						max: 30,
					}}
					defaultValue='Default Pack Title'
					placeholder='input pack title'
					status={error ? 'error' : ''}
				/>
				<Button style={{ width: '20%', height: '40px' }} onClick={handleSave}>
					{isEditing ? 'Save' : <EditOutlined />}
				</Button>
			</Space.Compact>
		</>
	);
}
