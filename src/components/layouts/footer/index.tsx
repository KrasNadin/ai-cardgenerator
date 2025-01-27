import { Flex } from 'antd';
import { SettingOutlined, ProductOutlined, SignatureOutlined, QuestionOutlined} from '@ant-design/icons'; 

export default function Footer() {
	return (
        <Flex justify='space-between' align='center' style={{ height: "100%" }}>
            <SettingOutlined className='main-icon'/>
            <ProductOutlined className='main-icon'/>
            <SignatureOutlined  className='main-icon'/>
            <QuestionOutlined className='main-icon'/>
        </Flex>
    )
}