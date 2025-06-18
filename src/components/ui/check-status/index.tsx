import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';

export const renderCheckStatus = (checkStatus: string) => {
	if (checkStatus === 'checking') {
		return <LoadingOutlined style={{ fontSize: 18 }} spin />;
	}
	if (checkStatus === 'success') {
		return <CheckOutlined style={{ color: 'green', fontSize: 18 }} />;
	}
	if (checkStatus === 'error') {
		return <CloseOutlined style={{ color: 'red', fontSize: 18 }} />;
	}
	return null;
};
