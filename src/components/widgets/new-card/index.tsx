import { EditOutlined, CheckOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Input, Divider, Button, Modal } from 'antd';
import { useState } from 'react';

import { SaveWindow } from '@/components/stateless/save-window';
import { useUserCards } from '@/store/presets/atoms';

type Props = {
	cardKey: string;
	frontText: string;
	backText: string;
};

export function NewCard({ cardKey, frontText, backText }: Props) {
	const { deleteCard, editCard } = useUserCards();
	const [frontSideText, setFrontText] = useState(frontText);
	const [backSideText, setBackText] = useState(backText);
	const [isEditing, setIsEditing] = useState(false);
	const [saveWindow, setSaveWindow] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [deleteWindow, setDeleteWindow] = useState(false);

	const handleEditCard = () => {
		if (isEditing) {
			editCard(cardKey, { frontSide: { text: frontSideText }, backSide: { text: backSideText } });
		}
		setIsEditing(!isEditing);
	};

	const toggleDeleteModal = () => {
		setDeleteWindow(!deleteWindow);
	};

	const handleDeleteCard = () => {
		deleteCard(cardKey);
	};

	const handleAddCard = () => {
		setSaveWindow(true);
		setIsSaved(true);
	};

	return (
		<>
			{saveWindow && <SaveWindow setSaveWindow={setSaveWindow} front={frontSideText} back={backSideText} />}
			{deleteWindow && (
				<Modal
					width='80%'
					title={
						<>
							Are you sure you want to delete this card?
							<br />
							This action cannot be undone.
						</>
					}
					open={deleteWindow}
					onOk={handleDeleteCard}
					onCancel={toggleDeleteModal}
				/>
			)}
			<Card
				size='small'
				actions={[
					<Button key={0} type='text' size='small' onClick={toggleDeleteModal}>
						<DeleteOutlined />
						Delete
					</Button>,

					<Button key={1} type='text' size='small' onClick={handleEditCard}>
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
				{isEditing ? <Input value={frontSideText} onChange={(e) => setFrontText(e.target.value)} /> : frontSideText}

				<Divider plain orientation='center' orientationMargin='0' style={{ margin: '-2px' }}>
					<p style={{ margin: '3px' }}>Back</p>
				</Divider>
				{isEditing ? <Input value={backSideText} onChange={(e) => setBackText(e.target.value)} /> : backSideText}
			</Card>
		</>
	);
}
