'use client';

import AdminLayout from "@/components/shared/admin-layout";

const { Result } = require("antd");

const NotFound = () => (
    <AdminLayout title={'Settings'}>
        <Result
            status={'404'}
            title={'404 | Not found'}
            subTitle={'Sorry, the page you are trying to access is not available !'}
        />
    </AdminLayout>
)

export default NotFound;