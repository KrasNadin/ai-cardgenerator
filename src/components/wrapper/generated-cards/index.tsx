import { Col } from 'antd';
import { FC } from 'react';

import { NewCard } from '@/components/widgets/new-card';

interface CardWrapperProps {
	cards: any[];
}

export const CardWrapper: FC<CardWrapperProps> = ({ cards }) => {
	return (
		<Col span={24} style={{ maxHeight: '400px', overflowY: 'auto' }}>
			{cards.length === 0 ? (
				<p style={{ textAlign: 'center', color: 'grey' }}>No cards yet...</p>
			) : (
				cards
					.slice()
					.reverse()
					.map((card) => (
						<div key={card.key} style={{ marginBottom: '16px' }}>
							<NewCard cardKey={card.key} frontText={card.frontSide.text} backText={card.backSide.text} isSaved={card.isSaved} />
						</div>
					))
			)}
		</Col>
	);
};
