'use client';
import { Button } from "antd";
import AdminLayout from "../../shared/admin-layout";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const Courses = () => {

    // Toolbar component coding
    const Toolbar = () => (
        <Link href={'/admin/courses/new'}>
            <Button
                type="primary"
                className="bg-indigo-600"
                size="large"
                style={{ borderRadius: 0 }}
                icon={<PlusOutlined />}
            >New Course</Button>
        </Link>
    )

    return (
        <AdminLayout
            title={'Courses'}
            toolbar={<Toolbar />}
        >
            <div>
                <h1 className="text-2xl text-red-500">Welcome to the courses</h1>
            </div>
        </AdminLayout>
    )
}

export default Courses;