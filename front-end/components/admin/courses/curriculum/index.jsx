'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { CaretRightOutlined, DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Form, Input, message, Modal, Table, theme } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import Uploader from "../../files/upload";
import ListEl from "../../files/list";
import axios from "axios";
import { http } from "@/modules/http";
import useSWR, { mutate } from "swr";
import moment from "moment";
import { useSession } from "next-auth/react";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT || "http://127.0.0.1:8000";
const { Item, useForm } = Form;

const fetcher = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const Curriculum = () => {
    // Hooks collection functions
    const { data: session } = useSession();
    const { curriculum } = useParams();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('id');
    const [topicForm] = useForm();
    // State collection
    const [editTopic, setEditTopic] = useState(null);
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState({
        open: false,
        title: null
    });

    const { data: topics, error: topicError } = useSWR(
        courseId ? `/topic/course/${courseId}/` : null,
        courseId ? fetcher : null
    )

    // delete topic 
    const onDeleteTopic = async (id) => {
        try {
            const httpReq = http(session && session.user.access);
            await httpReq.delete(`/topic/${id}/`);
            message.success("Topic deleted successfully");
            mutate(`/topic/course/${courseId}/`);
        } catch (error) {
            message.error("Unable to delete topic");
        }
    }

    // add topic or update
    const onTopicAddOrUpdate = async (values) => {
        values.courseId = courseId;
        const httpReq = http(session && session.user.access);

        if (editTopic === null) {
            try {
                await httpReq.post('/topic/private/', values);
                topicForm.resetFields();
                setOpen(false);
                message.success("Topic added successfully");
                mutate(`/topic/course/${courseId}/`);
            } catch (error) {
                message.error("Unable to add topic");
            }
        } else {
            try {
                await httpReq.put(`/topic/${editTopic.id}/`, values);
                topicForm.resetFields();
                setEditTopic(null);
                setOpen(false);
                message.success("Topic updated successfully");
                mutate(`/topic/course/${courseId}/`);
            } catch (error) {
                console.log(error);
                message.error("Unable to update topic");
            }

        }
    }

    // edit topic
    const onTopicEdit = async (obj) => {
        setOpen(true);
        setEditTopic(obj);
        topicForm.setFieldsValue(obj);
    }

    const columns = [
        {
            title: 'Topics',
            dataIndex: 'title',
            key: 'title',
            render: (text) =>
                <a
                    href="#"
                    className="capitalize"
                    onClick={() =>
                        setDrawerOpen({
                            title: text,
                            open: true
                        })
                    }>
                    {text}
                </a>
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (
                <label>{moment(text).format('DD-MM-YY HH:MM:SS A')}</label>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, obj) => (
                <div className="flex gap-x-4">
                    <Button
                        icon={<EditFilled />}
                        type="text"
                        className="bg-indigo-50 text-indigo-500"
                        onClick={() => onTopicEdit(obj)}
                    />
                    <Button
                        icon={<DeleteFilled />}
                        type="text"
                        className="bg-rose-50 text-rose-500"
                        onClick={() => onDeleteTopic(obj.id)}
                    />
                </div>
            )
        }
    ];

    // Toolbar for new course curriculum page
    const Toolbar = () => {
        return (
            <Button
                icon={<PlusOutlined />}
                type="primary"
                className="bg-green-500"
                style={{ borderRadius: 0 }}
                size="large"
                onClick={() => setOpen(true)}
            >
                Add Section
            </Button>
        );
    }

    // lessoncontent component used in lesson component
    const LessonContent = () => {
        // hooks collection for lesson component
        const [fileDialog, setFileDialog] = useState(false);

        const lessonDataSource = [
            {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
            },
            {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
            },
        ];

        const lessonColumns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
        ];

        return (
            <div className="shadow-lg flex flex-col gap-y-6">
                <Table
                    dataSource={lessonDataSource}
                    columns={lessonColumns}
                    pagination={false}
                />
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className="bg-green-500 w-fit mx-3 mb-3"
                    style={{ borderRadius: 0 }}
                    onClick={() => setFileDialog(true)}
                >
                    Media
                </Button>

                <Modal
                    open={fileDialog}
                    onCancel={() => setFileDialog(false)}
                    footer={false}
                >
                    <div className="flex flex-col gap-y-6 mt-6">
                        <Uploader />
                        <ListEl />
                    </div>
                </Modal>
            </div>
        )
    }

    // Lessons component for drawer content
    const Lessons = () => {
        const { token } = theme.useToken();
        const panelStyle = {
            marginBottom: 24,
            background: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            border: '1px solid #f2f2f2',
        };

        const getItems = (panelStyle) => [
            {
                key: '1',
                label: 'This is panel header 1',
                children: <LessonContent />,
                style: panelStyle,
            },
            {
                key: '2',
                label: 'This is panel header 2',
                children: <LessonContent />,
                style: panelStyle,
            },
            {
                key: '3',
                label: 'This is panel header 3',
                children: <LessonContent />,
                style: panelStyle,
            },
        ];

        return (
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    background: token.colorBgContainer,
                }}
                items={getItems(panelStyle)}
            />
        )
    }

    return (

        <AdminLayout
            title={curriculum.split('-').join(' ')}
            toolbar={<Toolbar />}
        >

            <Table
                rowKey="key"
                scroll={{
                    x: 1500,
                    y: 1200
                }}
                columns={columns}
                dataSource={topics || []}
            />

            <Modal
                open={open}
                onCancel={() => {
                    setOpen(false)
                    setEditTopic(null)
                    topicForm.resetFields()
                }}
                footer={null}
                title="Add New Topic"
            >

                <Form
                    layout="vertical"
                    onFinish={onTopicAddOrUpdate}
                    form={topicForm}
                >
                    <Item
                        label="Title"
                        name="title"
                        rules={[{ require: true }]}
                    >
                        <Input
                            size="large"
                        />
                    </Item>
                    <Item>
                        <Button
                            className={`text-white w-full ${editTopic ? 'bg-rose-500' : 'bg-blue-500'}`}
                            size="large"
                            htmlType="submit"
                        >
                            {editTopic ? "Update Topic" : "Submit"}
                        </Button>
                    </Item>
                </Form>

            </Modal>

            <Drawer
                title={drawerOpen.title}
                onClose={() => setDrawerOpen({ ...drawerOpen, open: false })}
                open={drawerOpen.open}
                width={920}
                extra={
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className="bg-violet-500 text-white"
                        style={{ borderRadius: 0 }}
                    >
                        Add Lesson
                    </Button>
                }
            >
                <Lessons />
            </Drawer>
        </AdminLayout>
    );
};
export default Curriculum;