import { Typography, Space } from 'antd';

const { Title, Paragraph, Link } = Typography;

export default function Info() {
	return (
		<Space direction='vertical' size='small' style={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: '24px' }}>
			<Title level={3}>About This App</Title>

			<Paragraph>
				Hi, I’m a beginner developer and this is one of my first projects. The app is still in <strong>beta</strong>, so you might notice
				some rough edges here and there. I’m actively working on new features and improvements.
			</Paragraph>

			<Paragraph>
				If you like this app, I’d really appreciate it if you gave it a star on
				<Link href='https://github.com/KrasNadin/ankipower-cardgenerator' target='_blank'>
					{' '}
					GitHub
				</Link>
			</Paragraph>

			<Title level={4}>Feedback & Contact</Title>

			<Paragraph>
				Have questions, found a bug, or got an idea to improve the app? Feel free to reach out to me at{' '}
				<Link href='mailto:<ankipower.contact@gmail.com>'>ankipower@gmail.com</Link>
			</Paragraph>

			<Title level={4}>Privacy</Title>

			<Paragraph>
				Everything you create in this app is stored only on your device. No data is sent anywhere — it’s your content, your control.
			</Paragraph>
		</Space>
	);
}
