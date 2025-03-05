import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';

import { PresetCard } from '@/components/stateless/preset-card';
import { usePacksActions } from '@/store/presets/atoms';
import { getPacks } from '@/store/presets/selector.ts';

export function PackList() {
	const navigate = useNavigate();

	const [packs] = useRecoilState(getPacks);
	const { deletePack } = usePacksActions();

	const handleEditPack = (packId: string) => {
		const url = `/pack/${packId}`;
		return navigate(url);
	};

	const handleDeletePack = (packId: string) => {
		deletePack(packId);
	};

	const renderPackList = useMemo(
		() =>
			packs.map(({ id, title, presets }) => (
				<PresetCard
					key={id}
					packId={id}
					title={title}
					presetsCount={presets.length}
					deleteItem={handleDeletePack}
					editItem={handleEditPack}
				/>
			)),
		[packs]
	);
	if (packs.length > 0) {
		return renderPackList;
	}
	return <p style={{ textAlign: 'center', marginTop: '10px' }}>You don't have any completed packs yet</p>;
}
