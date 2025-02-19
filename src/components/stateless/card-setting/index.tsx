import { EditOutlined } from '@ant-design/icons';
import { Card, Input, Button } from 'antd';
import { useState } from 'react';

type Props = {
	titleText: string;
	descriptionText: string;
	changeTitle: (value: string) => void;
	changeDescription: (value: string) => void;
};

export default function CardSetting({ titleText, descriptionText, changeTitle, changeDescription }: Props) {
	const [title, setTitle] = useState(titleText);
	const [description, setDescription] = useState(descriptionText);
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => {
		if (isEditing) {
			changeTitle(title);
			changeDescription(description);
		}
		setIsEditing(!isEditing);
	};

	return (
		<Card
			title={isEditing ? <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' /> : title}
			extra={
				<Button type='text' color='primary' variant='solid' style={{ marginLeft: '8px' }} onClick={toggleEdit}>
					{isEditing ? 'Save' : <EditOutlined />}
				</Button>
			}>
			{isEditing ? (
				<Input.TextArea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Enter description'
					autoSize={{ minRows: 2, maxRows: 4 }}
				/>
			) : (
				<p>{description}</p>
			)}
		</Card>
	);
}
