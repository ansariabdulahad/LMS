'use client';
import AdminLayout from "@/components/shared/admin-layout";
import Uploader from "./upload";
import { Breadcrumb, Button, Form, Input, Modal } from "antd";
import { ArrowLeftOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ListEl from "./list";
import { useState } from "react";

const Files = () => {

    // State collection
    const [open, setOpen] = useState(false);

    // Adding toolbar for Files & Media page
    const Toolbar = () => {
        return (
            <>
                <>
                    <Input
                        suffix={
                            <Button
                                icon={<SearchOutlined />}
                                type="text"
                                className="text-gray-200"
                            />
                        }
                        className="border-gray-200 md:w-96"
                        placeholder="Search Files..."
                        style={{ borderRadius: 0 }}
                    />
                    <Button
                        type="primary"
                        className="bg-indigo-600"
                        size="large"
                        style={{ borderRadius: 0 }}
                        icon={<PlusOutlined />}
                        onClick={() => setOpen(true)}
                    >New Folder</Button>
                </>
            </>
        )
    }

    // Onfinish function to get modal form values
    const onFinish = (values) => {
        console.log(values);
    }

    return (
        <AdminLayout
            title={'Files & Media'}
            toolbar={<Toolbar />}
        >
            <div className="md:w-9/12 mx-auto flex flex-col gap-y-6">
                <Uploader />
                <div className="flex flex-col gap-y-6">
                    <div className="flex justify-between items-center">
                        <Button
                            icon={<ArrowLeftOutlined />}
                        />
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Home',
                                },
                                {
                                    title: <a href="">Application Center</a>,
                                },
                                {
                                    title: <a href="">Application List</a>,
                                },
                                {
                                    title: 'An Application',
                                },
                            ]}
                        />
                    </div>
                    <ListEl />
                </div>
            </div>

            <Modal
                title={
                    <div className="flex flex-col gap-y-3">
                        <h1>New Folder</h1>
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Home',
                                },
                                {
                                    title: <a href="">Application Center</a>,
                                },
                                {
                                    title: <a href="">Application List</a>,
                                },
                                {
                                    title: 'An Application',
                                },
                            ]}
                        />
                        <Form onFinish={onFinish}>
                            <Form.Item
                                name={'folder'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Folder Name is required'
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Folder Name"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-indigo-600"
                                >
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                }
                open={open}
                centered
                footer={null}
                onCancel={() => setOpen(false)}
            ></Modal>
        </AdminLayout>
    )
}

export default Files;