import { Button, Card, Flex } from 'antd';

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

	const handleCardEdit = (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
		event.stopPropagation();
		editItem(itemId);
	};
	const handleCardDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		deleteItem(itemId);
	};
	return (
		<Card title={title} bordered={false} size='small' style={{ textAlign: 'left', marginTop: '7px' }} onClick={handleCardEdit}>
			<p style={{ marginTop: '-3px' }}>{cardContent}</p>
			<Flex gap='middle'>
				<Button onClick={handleCardEdit} color='primary' variant='solid'>
					Edit
				</Button>
				<Button onClick={handleCardDelete} color='danger' variant='solid'>
					Delete
				</Button>
			</Flex>
		</Card>
	);
}
