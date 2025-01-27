import { Typography, Flex } from 'antd';
import { SunOutlined, SlackOutlined } from '@ant-design/icons'; 

const { Title } = Typography;

export default function Header() {
	return (
        <>
            <Flex justify='space-between' align='center' style={{ height: "100%" }}>
                <SlackOutlined className='main-icon' />
                <Title level={4} style={{ margin: 0 }}>Setting</Title>
                <SunOutlined className='main-icon' />
            </Flex>
        </>
    )
}