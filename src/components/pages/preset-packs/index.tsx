import { FolderAddOutlined } from '@ant-design/icons';
import { Button, Alert, Row, Col } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { PackList } from '@/components/wrapper/pack-list';

export default function PresetPacks() {
	const navigate = useNavigate();

	const handleCreatePack = useCallback(async () => await navigate('/pack/new'), [navigate]);

	return (
		<Row justify='center' gutter={[0, 24]} style={{ width: 'auto' }}>
			<Col span={24}>
				<Alert
					message='Informational Notes'
					description='info text'
					type='info'
					showIcon
					closable
					style={{
						width: '100%',
						maxWidth: '100%',
						padding: '16px',
					}}
				/>
			</Col>
			<Col span={24}>
				<Button
					onClick={handleCreatePack}
					type='text'
					color='primary'
					variant='solid'
					style={{
						height: '50px',
						width: '100%',
					}}>
					<FolderAddOutlined className='mainIcon' />
					Create your pack
				</Button>
			</Col>
			<Col span={24}>
				<PackList />
			</Col>
		</Row>
	);
}
