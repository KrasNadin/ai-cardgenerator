import { ArrowLeftOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Row, Col, Divider } from 'antd';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import SavedInput from '@/components/ui/saved-input';
import { PresetsList } from '@/components/wrapper/presets-list';
import { packsState, usePacksActions } from '@/store/presets/atoms';
import { randomId } from '@/store/presets/atoms';

export default function Pack() {
	const navigate = useNavigate();
	const { packId } = useParams();
	const isEditingMode = Boolean(packId && packId !== 'new');
	const { addPack, updatePack } = usePacksActions();

	const packs = useRecoilValue(packsState);
	const pack = packs.find((p) => p.id === packId);
	const packTitle = pack?.title || 'Default title';

	const handleSavePack = useCallback(
		(title: string) => {
			if (!isEditingMode) {
				const newPackId = randomId();
				addPack({ id: newPackId, title });
				navigate(`/pack/${newPackId}`);
				return newPackId;
			}
			updatePack(packId!, { title });
			return packId;
		},
		[packId, isEditingMode, addPack, updatePack, navigate]
	);

	const handleGoToCreatePreset = useCallback(() => {
		const newPackId = isEditingMode ? packId : randomId();
		if (!isEditingMode) addPack({ id: newPackId!, title: 'Default title' });
		navigate(`/pack/${newPackId}/new`);
	}, [isEditingMode, packId, addPack, navigate]);

	const handleBack = () => {
		navigate(`/packs`);
	};

	return (
		<Row justify='center' gutter={[0, 24]} style={{ width: 'auto' }}>
			<Col span={24}>
				<Button
					type='text'
					variant='solid'
					style={{ paddingLeft: 0 }}
					icon={<ArrowLeftOutlined className='mainIcon' />}
					onClick={handleBack}>
					Back to packs
				</Button>
				<Divider orientation='left' orientationMargin='0'>
					Pack Title
				</Divider>
				<SavedInput text={packTitle} saveChange={handleSavePack} />
			</Col>
			<Col span={24}>
				<Button onClick={handleGoToCreatePreset} type='text' color='primary' variant='solid' style={{ height: '50px', width: '100%' }}>
					<FormOutlined />
					Create new card
				</Button>
			</Col>
			<Col span={24}>
				<PresetsList packId={packId} />
			</Col>
		</Row>
	);
}
