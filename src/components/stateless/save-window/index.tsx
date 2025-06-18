import { Modal, Select, Spin, Space } from 'antd';
import { useEffect, useState } from 'react';

import { addCardToAnki, checkAnkiConnection } from '@/api/anki-responses';

type Props = {
	setSaveWindow: (value: boolean) => void;
	front: string;
	back: string;
};

export function SaveWindow({ setSaveWindow, front, back }: Props) {
	const [deckNameList, setDeckNameList] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		async function loadDecks() {
			try {
				const result = await checkAnkiConnection();
				if (Array.isArray(result)) {
					setDeckNameList(result);
				}
			} catch (err) {
				console.error('Failed to fetch decks', err);
			} finally {
				setLoading(false);
			}
		}

		loadDecks();
	}, []);

	const handleChange = (value: string[]) => {
		const normalized = value.map((tag) => {
			const cleaned = tag.trim().replace(/^#+/, '');
			return `#${cleaned}`;
		});
		setTags(normalized);
	};

	const handleOk = () => {
		if (selectedDeck) {
			addCardToAnki(selectedDeck, front, back, tags);
		}
		setSaveWindow(false);
	};

	const handleCancel = () => {
		setSaveWindow(false);
	};

	return (
		<Modal
			title='Choose where to save the card'
			open={true}
			onOk={handleOk}
			onCancel={handleCancel}
			okButtonProps={{ disabled: !selectedDeck }}>
			{loading ? (
				<Space>
					<Spin /> <p>Hold on, let's see where we can save this card.</p>
				</Space>
			) : deckNameList.length === 0 ? (
				<p style={{ color: 'red' }}>
					Oops, something went wrong. Please check your connection to Anki and make sure the application is running.
				</p>
			) : (
				<>
					<p>Select a deck:</p>
					<Select
						style={{ width: '100%' }}
						placeholder='Select deck'
						value={selectedDeck || undefined}
						onChange={(value) => setSelectedDeck(value)}>
						{deckNameList.map((deckName) => (
							<Select.Option key={deckName} value={deckName}>
								{deckName}
							</Select.Option>
						))}
					</Select>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '30px' }}>
						<span style={{ whiteSpace: 'nowrap' }}>Add hashtags:</span>
						<Select
							mode='tags'
							style={{ flex: 1 }}
							placeholder='#your_hashtags'
							value={tags}
							open={false}
							suffixIcon={null}
							onChange={handleChange}
							tokenSeparators={[' ', ',']}
						/>
					</div>
				</>
			)}
		</Modal>
	);
}
