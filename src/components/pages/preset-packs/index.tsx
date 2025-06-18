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
					message='How to Create a Card Pack'
					description={
						<>
							<ol style={{ paddingLeft: '16px', margin: 0 }}>
								<li>
									<strong>Create a pack</strong> – give it a name (e.g., "English Vocabulary").
								</li>
								<li>
									<strong>Add cards</strong> to the pack – each card can be of a different type (word → translation, word → meaning, etc.).
								</li>
								<li>
									For each card:
									<ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: '20px' }}>
										<li>
											Give it a <strong>title</strong> and optional <strong>description</strong>.
										</li>
										<li>
											Write a <strong>prompt for GPT</strong> – this will generate the front and back of the card.
										</li>
									</ul>
								</li>
							</ol>
						</>
					}
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
