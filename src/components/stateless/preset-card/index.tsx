import { Button, Card, Flex, Modal } from 'antd';
import { useState } from 'react';

type Props = {
	packId?: string;
	presetId?: string;
	title: string;
	description?: string;
	presetsCount?: number;
	deleteItem: (id: string) => void;
	editItem: (id: string) => void;
};

export function PresetCard({ packId, presetId, title, description, presetsCount, deleteItem, editItem }: Props) {
	const cardContent = description || `Presets: ${presetsCount}`;
	const itemId = (presetId || packId)!;
	const [deleteWindow, setDeleteWindow] = useState(false);

	const handleCardEdit = (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
		event.stopPropagation();
		editItem(itemId);
	};
	const toggleDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setDeleteWindow(!deleteWindow);
	};
	const handleCardDelete = () => {
		deleteItem(itemId);
	};

	return (
		<>
			{deleteWindow && (
				<Modal
					width='80%'
					title='Are you sure you want to delete this?'
					open={deleteWindow}
					onOk={handleCardDelete}
					onCancel={toggleDeleteModal}></Modal>
			)}
			<Card title={title} bordered={false} size='small' style={{ textAlign: 'left', marginTop: '7px' }} onClick={handleCardEdit}>
				<p style={{ marginTop: '-3px' }}>{cardContent}</p>
				<Flex gap='middle'>
					<Button onClick={handleCardEdit} color='primary' variant='solid'>
						Edit
					</Button>
					<Button onClick={toggleDeleteModal} color='danger' variant='solid'>
						Delete
					</Button>
				</Flex>
			</Card>
		</>
	);
}
