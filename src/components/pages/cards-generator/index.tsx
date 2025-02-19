import { SignatureOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Button, Row, Col, Select, Input, Divider } from 'antd';
import type { SelectProps } from 'antd';
import { useCallback, useState } from 'react';

import NewCard from '@/components/stateless/new-card';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
	options.push({
		value: i.toString(36) + i,
		label: i.toString(36) + i,
	});
}

const handleChange = (value: string) => {
	console.log(`selected ${value}`);
};

export default function CardGenerator() {
	const [text, setText] = useState('');

	const handlePaste = useCallback(async () => {
		try {
			const clipboardText = await navigator.clipboard.readText();
			setText(clipboardText);
		} catch (err) {
			console.error('Failed to read clipboard:', err);
		}
	}, []);

	const handleGenerate = () => {
		console.log('generate new card');
	};

	return (
		<Row justify='center' gutter={[0, 24]} style={{ width: 'auto' }}>
			<Col span={24}>
				<Select style={{ width: '100%' }} placeholder='Select preset pack' onChange={handleChange} options={options} />
			</Col>
			<Col span={24} style={{ position: 'relative' }}>
				<Input.TextArea
					value={text}
					placeholder='Write text for card'
					allowClear
					onChange={(e) => setText(e.target.value)}
					autoSize={{ minRows: 2, maxRows: 6 }}
					style={{ paddingLeft: '40px' }} // Отступ справа, чтобы не перекрывать иконку
				/>
				<Button
					type='text'
					onClick={handlePaste}
					style={{
						position: 'absolute',
						left: '0px',
						zIndex: 10,
					}}>
					<SnippetsOutlined style={{ color: 'grey' }} />
				</Button>
			</Col>
			<Col span={24}>
				<Button
					onClick={handleGenerate}
					type='text'
					color='primary'
					variant='solid'
					style={{
						height: '50px',
						width: '100%',
					}}>
					<SignatureOutlined className='mainIcon' />
					Generate new card
				</Button>
			</Col>
			<Col span={24}>
				<Divider orientation='left' orientationMargin='0'>
					Choose card for create
				</Divider>
				<NewCard />
			</Col>
		</Row>
	);
}
