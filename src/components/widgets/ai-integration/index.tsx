import { Flex, Button, Typography, Input } from 'antd';

const { Text, Link } = Typography;

export default function AiIntagration() {
    return (
        <Flex vertical gap="middle">
            <Flex vertical>
                <Text>1. Go to your <Link href="https://chat.openai.com/" target="_blank">ChatGPT account</Link> and copy api key.</Text>
                <Text>2. Paste your api key here:</Text>
            </Flex>
            <Flex gap="middle">
                <Input placeholder="api key" variant="filled" />
                <Button color="primary" variant="solid">Check</Button>
            </Flex>
        </Flex>
    )
}