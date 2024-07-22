'use client';
const { Result } = require("antd");

const NotFound = () => (
    <Result
        status={'404'}
        title={'404 | Not found'}
        subTitle={'Sorry, the page you are trying to access is not available !'}
    />
)

export default NotFound;