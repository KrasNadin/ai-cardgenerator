import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { PresetCard } from '@/components/stateless/preset-card';
import { getPacks } from '@/store/presets/selector.ts';

export function PackList() {
	const [packs] = useRecoilState(getPacks);

	const renderPackList = useMemo(
		() => packs.map(({ id, title, presets }) => <PresetCard key={id} packId={id} title={title} presetsCount={presets.length} />),
		[packs]
	);
	if (packs.length > 0) {
		return renderPackList;
	}
	return <p>You don't have any completed packs yet</p>;
}
