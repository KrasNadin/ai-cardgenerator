import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

import { PresetCard } from '@/components/stateless/preset-card';
import { usePacksActions } from '@/store/presets/atoms';
import { getPacks } from '@/store/presets/selector.ts';

type Props = {
	packId?: string;
};

export function PresetsList({ packId }: Props) {
	const navigate = useNavigate();

	const [packs] = useRecoilState(getPacks);
	const { deletePreset } = usePacksActions();

	const handleEditPreset = (presetId: string) => {
		const url = `/pack/${packId}/${presetId}`;
		return navigate(url);
	};

	const handleDeletePreset = (presetId: string) => {
		if (!packId) return;
		deletePreset(packId, presetId);
	};

	const presets = useMemo(() => packs.find((pack) => pack.id === packId)?.presets, [packs, packId]);

	const renderPresetsList = useMemo(
		() =>
			presets?.map(({ id, title, description }) => (
				<PresetCard
					key={id}
					packId={packId}
					presetId={id}
					title={title}
					description={description}
					deleteItem={handleDeletePreset}
					editItem={handleEditPreset}
				/>
			)),
		[presets, packId]
	);
	if (presets?.length || 0 > 0) {
		return renderPresetsList;
	}
	return <p style={{ textAlign: 'center', marginTop: '10px' }}>You don't have any cards yet</p>;
}
