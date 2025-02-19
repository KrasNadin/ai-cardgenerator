import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { PresetCard } from '@/components/stateless/preset-card';
import { getPacks } from '@/store/presets/selector.ts';

type Props = {
	packId?: string;
};

export function PresetsList({ packId }: Props) {
	const [packs] = useRecoilState(getPacks);

	const presets = useMemo(() => packs.find((pack) => pack.id === packId)?.presets, [packs, packId]);

	const renderPresetsList = useMemo(
		() =>
			presets?.map(({ id, title, description }) => (
				<PresetCard key={id} packId={packId} presetId={id} title={title} description={description} />
			)),
		[presets, packId]
	);
	if (presets?.length || 0 > 0) {
		return renderPresetsList;
	}
	return <p style={{ textAlign: 'center', marginTop: '10px' }}>You don't have any cards yet</p>;
}
