'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { EditFilled, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Empty, Form, Input, Modal, Tag } from "antd";
import axios from "axios";
import { useState } from "react";

const Settings = () => {
    // hook collection
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [notifications, setNotications] = useState([]);

    // createnotification function to get form values
    const createNotification = (values) => {
        setNotications([...notifications, values]);
        setOpen(false);
    }

    // Testing backend api to fetch data using axios
    const test = async () => {
        try {
            const response = await axios({
                'method': 'GET',
                'url': 'http://localhost:8000/notification/'
            });
            console.log(response.data);

        } catch (error) {
            console.log(error.message);

        }
    }

    return (
        <AdminLayout title={'Settings'}>
            <Button onClick={test}>Testing API</Button>
            <div className="grid md:grid-cols-3 gap-6">
                <Card
                    title="Profile"
                    className="shadow md:col-span-3"
                    extra={
                        <Button
                            icon={<EditFilled />}
                            type="text"
                            onClick={() => setEdit(!edit)}
                        />
                    }
                >
                    <div className="flex flex-col gap-y-8">
                        <div className="flex items-center gap-x-6">
                            <Avatar
                                icon={<UserOutlined />}
                                size={"large"}
                            />
                            <div>
                                <h1 className="text-lg font-semibold">Alok Kumar</h1>
                                <p className="text-gray-500">alok@gmail.com</p>
                            </div>
                        </div>
                        <Form layout="vertical"
                            className="grid md:grid-cols-2 gap-x-4"
                        >
                            <Form.Item
                                name={'fullname'}
                                label="Fullname"
                            >
                                <Input
                                    defaultValue="Ahad Ansari"
                                    size="large"
                                    disabled={!edit}
                                />
                            </Form.Item>
                            <Form.Item
                                name={'email'}
                                label="Email"
                            >
                                <Input
                                    defaultValue="ahad@gmail.com"
                                    size="large"
                                    disabled={!edit}
                                />
                            </Form.Item>
                            <Form.Item
                                name={'country'}
                                label="Country"
                            >
                                <Input
                                    defaultValue="India"
                                    size="large"
                                    disabled={!edit}
                                />
                            </Form.Item>
                            <Form.Item
                                name={'gender'}
                                label="Gender"
                            >
                                <Input
                                    defaultValue="Male"
                                    size="large"
                                    disabled={!edit}
                                />
                            </Form.Item>
                            {
                                edit &&
                                <Form.Item>
                                    <div className="flex gap-x-4">
                                        <Button
                                            type="primary"
                                            className="bg-rose-500"
                                            onClick={() => setEdit(false)}
                                            htmlType="submit"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            type="primary"
                                            className="bg-blue-500"
                                            onClick={() => setEdit(false)}
                                        >
                                            Cancle
                                        </Button>
                                    </div>
                                </Form.Item>
                            }
                        </Form>
                    </div>
                </Card>
                <Card
                    title="Notifications"
                    className="shadow md:col-span-2"
                >
                    <div>
                        {
                            notifications.length === 0 &&
                            <Empty />
                        }
                        {
                            notifications.map((item, index) => (
                                <Tag className="mb-2" key={index} color={item.color}>
                                    {item.title}
                                </Tag>
                            ))
                        }
                    </div>
                    <div className="text-center">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className="bg-amber-500 mt-4"
                            style={{ borderRadius: 0 }}
                            onClick={() => setOpen(true)}
                        >
                            Add
                        </Button>
                    </div>
                </Card>
                <Card
                    title="Profile"
                    className="shadow"
                >
                    <div>Dummy</div>
                </Card>
            </div>

            <Modal
                title="New Notification"
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <Form onFinish={createNotification}>
                    <Form.Item
                        name='title'
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder="title"
                        />
                    </Form.Item>
                    <Form.Item
                        name='color'
                        rules={[{ required: true }]}
                    >
                        <Input
                            type="color"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="bg-violet-500"
                            type="primary"
                            htmlType="submit"
                        >
                            create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    )
}

export default Settings;