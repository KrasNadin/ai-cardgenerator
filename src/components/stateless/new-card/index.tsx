import { EditOutlined, CheckOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Input, Divider, Button } from 'antd';
import { useState } from 'react';

export default function NewCard() {
	const [frontText, setFrontText] = useState('table');
	const [backText, setBackText] = useState('стол');
	const [isEditing, setIsEditing] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const toggleEdit = () => setIsEditing(!isEditing);
	const handleDeleteCard = () => {
		console.log('delete');
	};
	const handleAddCard = () => setIsSaved(true);

	return (
		<Card
			size='small'
			actions={[
				<Button key={0} type='text' size='small' onClick={handleDeleteCard}>
					<DeleteOutlined />
					Delete
				</Button>,

				<Button key={1} type='text' size='small' onClick={toggleEdit}>
					{isEditing ? <CheckOutlined /> : <EditOutlined />}
					{isEditing ? 'Done' : 'Edit'}
				</Button>,

				<Button key={2} type='text' size='small' onClick={handleAddCard}>
					{isSaved ? <SaveOutlined style={{ color: 'grey' }} /> : <SaveOutlined />}
					{isSaved ? 'Saved' : 'Save'}
				</Button>,
			]}>
			<Divider plain orientation='center' orientationMargin='0' style={{ margin: '-2px' }}>
				<p style={{ margin: '3px' }}>Front</p>
			</Divider>
			{isEditing ? <Input value={frontText} onChange={(e) => setFrontText(e.target.value)} /> : frontText}

			<Divider plain orientation='center' orientationMargin='0' style={{ margin: '-2px' }}>
				<p style={{ margin: '3px' }}>Back</p>
			</Divider>
			{isEditing ? <Input value={backText} onChange={(e) => setBackText(e.target.value)} /> : backText}
		</Card>
	);
}
