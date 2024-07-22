'use client';
const { Spin } = require("antd");

const Loader = () => (
    <div className="flex justify-center items-center min-h-screen">
        <Spin
            size="large"
        />
    </div>
)

export default Loader;