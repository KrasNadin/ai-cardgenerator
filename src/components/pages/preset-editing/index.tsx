import { Divider, Button, Row, Col, Input, Card } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilState } from 'recoil';

import PromptArea from '@/components/ui/prompt-area';
import { usePacksActions, randomId } from '@/store/presets/atoms';
import { getPacks } from '@/store/presets/selector.ts';

interface UserPreset {
	title: string;
	description: string;
	frontPrompt: string;
	backPrompt: string;
}

export default function PresetEditing() {
	const navigate = useNavigate();
	const { packId, presetId } = useParams();
	const isEditingMode = Boolean(presetId && presetId !== 'new');

	const [packs] = useRecoilState(getPacks);
	const preset = useMemo(
		() => packs.find((pack) => pack.id === packId)?.presets.find((preset) => preset.id === presetId),
		[packs, packId, presetId]
	);

	const { addPresetToPack, updatePreset } = usePacksActions();
	const [userPreset, setUserPreset] = useState<UserPreset>({
		title: preset?.title || 'English-russian dictionary',
		description:
			preset?.description || 'Flashcards for learning English with an English word on the front side and a Russian translation on the back',
		frontPrompt:
			preset?.frontPrompts?.text ||
			'Write an English word along with its transcription in the International Phonetic Alphabet (IPA). Format it as follows: Word [wɜːrd] Do not add any explanations or extra text, just the word and its transcription',
		backPrompt:
			preset?.backPrompts?.text ||
			'Provide the Russian translation of the given English word. Only include one or multiple meanings without any additional explanations. Format it as follows: слово',
	});

	const handleUpdatePreset = useCallback((field: keyof UserPreset, value: string) => {
		setUserPreset((prev) => ({ ...prev, [field]: value }));
	}, []);

	const handleSavePreset = useCallback(() => {
		if (isEditingMode) {
			updatePreset(packId!, presetId!, userPreset);
		} else {
			const newId = randomId('preset');
			addPresetToPack(
				{
					id: newId,
					title: userPreset.title,
					description: userPreset.description,
					frontPrompts: { text: userPreset.frontPrompt },
					backPrompts: { text: userPreset.backPrompt },
				},
				packId!
			);
		}
		navigate(`/pack/${packId}`);
	}, [userPreset, packId, presetId]);

	return (
		<Row justify='center' gutter={[0, 24]} style={{ width: 'auto' }}>
			<Col span={24}>
				<Card
					title={
						<Input
							value={userPreset.title}
							onChange={(value) => handleUpdatePreset('title', value.target.value)}
							placeholder='Enter title'
						/>
					}>
					<Input.TextArea
						onChange={(value) => handleUpdatePreset('description', value.target.value)}
						value={userPreset.description}
						placeholder='Enter description'
						autoSize={{ minRows: 2, maxRows: 4 }}
					/>
				</Card>
			</Col>
			<Col span={24}>
				<Divider orientation='left' orientationMargin='0'>
					Front of Card
				</Divider>
				<PromptArea prompt={userPreset.frontPrompt} changePrompt={(value) => handleUpdatePreset('frontPrompt', value)} />
				<Divider orientation='left' orientationMargin='0'>
					Back of Card
				</Divider>
				<PromptArea prompt={userPreset.backPrompt} changePrompt={(value) => handleUpdatePreset('backPrompt', value)} />
			</Col>
			<Col span={24}>
				<Button
					onClick={handleSavePreset}
					type='primary'
					style={{
						height: '50px',
						width: '100%',
					}}>
					Save
				</Button>
			</Col>
		</Row>
	);
}
