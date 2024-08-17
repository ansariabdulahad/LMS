'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { CloseOutlined, EditFilled, PlusOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Empty, Form, Input, message, Modal, Tag } from "antd";
import axios from "axios";
import { useState } from "react";
import useSWR, { mutate } from "swr";

// httpRequest function for fetching data while page rendering
const httpRequest = async (url) => {
    try {
        const { data } = await axios({
            method: "GET",
            url
        });
        return data;
    } catch (error) {
        return null;
    }
}

const Settings = () => {
    // hook collection
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [messageApi, contextHolder] = message.useMessage(); // antd message pattern
    // handling global state for loading when delete opration performed
    const [loading, setLoading] = useState({
        index: null,
        state: false,
        type: null
    });

    // useSwr for data fetching while page rendering
    const { data, error } = useSWR(
        'http://localhost:8000/notification/',
        httpRequest
    );

    // createnotification function to get form values
    const createNotification = async (values) => {
        setLoading({
            type: 'create',
            state: true
        })
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:8000/notification/',
                data: values
            });
            mutate("http://localhost:8000/notification/");
            setLoading({
                type: null,
                state: false
            })
            form.resetFields();
            messageApi.open({
                type: 'success',
                content: "Notification created successfully."
            })
            setOpen(false);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: "Unable to create notification, please try again !"
            });
            setLoading({
                type: null,
                state: false
            })
        }
    }

    // delete notifications api called
    const deleteNotification = async (id, index) => {

        setLoading({
            index: index,
            state: true,
            type: 'notification'
        });

        try {
            await axios({
                method: 'DELETE',
                url: `http://localhost:8000/notification/${id}/`
            });

            setLoading({
                state: false,
                type: null
            });

            messageApi.open({
                type: 'success',
                content: "Notification deleted successfully."
            })
            mutate('http://localhost:8000/notification/');

        } catch (error) {
            setLoading({
                state: false,
                type: null
            });
            console.log(error.message);
        }
    }

    // Testing backend api to fetch data using axios
    // const test = async () => {
    //     try {
    //         const response = await axios({
    //             'method': 'GET',
    //             'url': 'http://localhost:8000/notification/'
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    return (
        <AdminLayout title={'Settings'}>

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
                    <div className="flex items-center justify-center flex-wrap">
                        {
                            data && data.length === 0 &&
                            <Empty />
                        }
                        {
                            data && data.map((item, index) => (
                                <Tag
                                    className="mb-2 flex flex-row-reverse gap-x-2"
                                    key={index}
                                    color={item.color}
                                    icon={
                                        (
                                            loading.state &&
                                            loading.type === 'notification' &&
                                            loading.index === index
                                        )
                                            ? <SyncOutlined spin />
                                            : <CloseOutlined
                                                onClick={() => deleteNotification(item.id, index)}
                                            />

                                    }
                                >
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
                <Form
                    form={form}
                    onFinish={createNotification}>
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
                        {
                            (loading.state && loading.type === "create")
                                ? <Button
                                    className="bg-violet-500 text-white"
                                    type="text"
                                    htmlType="button"
                                    loading
                                >
                                    processing...
                                </Button>
                                : <Button
                                    className="bg-violet-500"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    create
                                </Button>
                        }
                    </Form.Item>
                </Form>
            </Modal>
            {contextHolder}
        </AdminLayout>
    )
}

export default Settings;