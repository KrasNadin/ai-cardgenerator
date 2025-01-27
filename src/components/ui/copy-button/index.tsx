import { Button, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";


type Props = {
  text: string;
};


export default function CopyButton({ text }: Props) {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text); 
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("ERROR: Failed to copy text")
        }
    }


  return (
    <Tooltip title="Copied!" open={isCopied}>
      <Button type="text" onClick={handleCopy}>
        <CopyOutlined />
      </Button>
    </Tooltip>
  );
}
