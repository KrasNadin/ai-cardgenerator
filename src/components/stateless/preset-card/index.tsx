import { Button, Card, Flex } from 'antd';
import { useNavigate } from 'react-router';

type Props = {
	packId?: string;
	presetId?: string;
	title: string;
	description?: string;
	presetsCount?: number;
};

export function PresetCard({ packId, presetId, title, description, presetsCount }: Props) {
	const navigate = useNavigate();
	const cardContent = description || `Presets: ${presetsCount}`;

	const handleCardEdit = (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
		event.stopPropagation();
		const url = presetId ? `/pack/${packId}/${presetId}` : `/pack/${packId}`;
		return navigate(url);
	};
	const handleCardDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
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
