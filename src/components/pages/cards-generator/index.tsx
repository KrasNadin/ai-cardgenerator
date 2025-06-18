import { ExclamationOutlined, SignatureOutlined } from '@ant-design/icons';
import { Row, Col, Select, Button, Divider, Alert, notification } from 'antd';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { PasteInput } from '@/components/ui/paste-input';
import { CardWrapper } from '@/components/wrapper/generated-cards';
import { useGenerateCards } from '@/hooks/generate-cards';
import { userCards, useUserCards } from '@/store/presets/atoms';
import { getApiKey, getPacks } from '@/store/presets/selector';
import { Card } from '@/store/presets/types';

export default function CardGenerator() {
	const apiKey = useRecoilValue(getApiKey);

	const packs = useRecoilValue(getPacks);
	const [selectedPack, setSelectedPack] = useState<string | null>(null);

	const { addCard } = useUserCards();
	const cards = useRecoilValue(userCards);

	const [word, setWord] = useState('');
	const { generatedCard, loading } = useGenerateCards(apiKey);

	const [api, contextHolder] = notification.useNotification();

	const openNotification = (message: string) => {
		api.info({
			message: message,
			icon: <ExclamationOutlined />,
			placement: 'bottomRight',
		});
	};

	if (!apiKey) {
		console.error('API-key OpenAI not found!');
		openNotification('Hmm, that didn’t work. Make sure your GPT key settings are correct.');
	}

	const handlePackChange = (value: string) => {
		setSelectedPack(value);
	};

	const handleGenerate = async () => {
		if (!selectedPack) {
			openNotification('Choose the pack');
			return;
		}

		const pack = packs.find((p) => p.id === selectedPack);
		if (!pack) {
			openNotification('Pack not found');
			return;
		}

		const { presets } = pack;
		if (!presets?.length) {
			openNotification('Selected pack has no presets');
			return;
		}

		try {
			const responseResults = await Promise.all(presets.map((preset) => generatedCard(preset, word)));

			const validCards = responseResults.filter(Boolean) as Card[];

			if (validCards.length > 0) {
				addCard(validCards);
			}
		} catch (err) {
			console.error('Card generation failed:', err);
		}
	};

	return (
		<>
			{contextHolder}
			<Row justify='center' gutter={[0, 24]} style={{ width: 'auto' }}>
				<Col span={24}>
					<Alert
						message='Do you have the Anki app open?'
						description='Make sure the Anki app is running while using this integration — it only works when Anki is open.'
						type='info'
						closable
						style={{
							width: '100%',
							maxWidth: '100%',
							padding: '16px',
						}}
					/>
				</Col>
				<Col span={24}>
					<Select
						style={{ width: '100%' }}
						placeholder='Select preset pack'
						onChange={handlePackChange}
						options={packs.map((pack) => ({
							value: pack.id,
							label: pack.title,
						}))}
					/>
				</Col>
				<Col span={24} style={{ position: 'relative' }}>
					<PasteInput setWord={setWord} />
				</Col>
				<Col span={24}>
					<Button onClick={handleGenerate} type='primary' disabled={loading} style={{ height: '50px', width: '100%' }}>
						<SignatureOutlined className='mainIcon' />
						{loading ? 'Generating...' : 'Generate new card'}
					</Button>
				</Col>
				<Col span={24}>
					<Divider>Choose card for create</Divider>
					<CardWrapper cards={cards} />
				</Col>
			</Row>
		</>
	);
}
