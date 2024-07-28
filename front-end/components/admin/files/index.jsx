'use client';
import AdminLayout from "@/components/shared/admin-layout";
import Uploader from "./upload";

const Files = () => {
    return (
        <AdminLayout title={'Files & Media'}>
            <div>
                <Uploader />
            </div>
        </AdminLayout>
    )
}

export default Files;