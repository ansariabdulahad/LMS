'use client';
import { DingdingOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Logo = ({ size = 30, text }) => {
    return (
        <Button
            icon={<DingdingOutlined
                className="text-rose-600"
            />}
            className="font-bold shadow-none border-0"
            style={{
                fontFamily: 'bela-semibold',
                fontSize: size
            }}
        >
            {text || "LMS"}
        </Button>
    )
}

export default Logo;