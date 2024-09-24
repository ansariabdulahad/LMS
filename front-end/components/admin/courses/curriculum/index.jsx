'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { CaretRightOutlined, DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Form, Input, List, message, Modal, Table, theme } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Uploader from "../../files/upload";
import ListEl from "../../files/list";
import axios from "axios";
import { http } from "@/modules/http";
import useSWR, { mutate } from "swr";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { resetFile } from "@/redux/slices/file.slice";

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
    const fileSlice = useSelector(state => state.fileSlice);
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const { curriculum } = useParams();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('id');
    const [topicForm] = useForm();
    const [lessonForm] = useForm();
    // State collection
    const [editTopic, setEditTopic] = useState(null);
    const [lessonModal, setLessonModal] = useState(false);
    const [lessonId, setLessonId] = useState(null);
    const [key, setKey] = useState(null);
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState({
        topicId: null,
        open: false,
        title: null
    });
    const [lessons, setLessons] = useState([]);
    const [editLesson, setEditLesson] = useState(null);

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

    // onDrawer coding for lesson
    const onDrawer = async (text, obj) => {
        setDrawerOpen({
            topicId: obj.id,
            title: text,
            open: true
        })

        try {
            const httpReq = http(session && session.user.access)
            const { data } = await httpReq.get(`/lesson/topic/${obj.id}/`);
            setLessons(data);

        } catch (error) {
            console.log(error);
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: 'Topics',
            dataIndex: 'title',
            key: 'title',
            render: (text, obj) =>
                <a
                    href="#"
                    className="capitalize"
                    onClick={() => onDrawer(text, obj)}>
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

    // onLesson delete function
    const onLessonDelete = async (id) => {
        try {
            const httpReq = http(session && session.user.access);
            await httpReq.delete(`/lesson/${id}/`);
            message.success("Lesson deleted successfully");
            onDrawerClose();
        } catch (error) {
            message.error(error.message);
        }
    }

    // onLesson edit function
    const onLessonEdit = (item) => {
        setLessonModal(true);
        lessonForm.setFieldsValue(item);
        setEditLesson(item);
    }

    // lessoncontent component used in lesson component
    const LessonContent = ({ obj }) => {
        // hooks collection for lesson component
        const [fileDialog, setFileDialog] = useState(false);

        // onmeia conding
        const onMedia = (id, key) => {
            setFileDialog(true);
            setLessonId(id);
            setKey(key);
        }

        return (
            <div className="flex flex-col gap-y-6 shadow rounded-sm p-4 bg-blue-50">
                <List>
                    <List.Item className="p-2">
                        <p><b>Video: </b>{obj.videoUrl}</p>
                        <Button
                            icon={<PlusOutlined />}
                            className="bg-green-500 text-white"
                            onClick={() => onMedia(obj.id, 'videoUrl')}
                        />
                    </List.Item>
                    <List.Item className="p-2">
                        <p><b>Assets: </b>{obj.accest}</p>
                        <Button
                            icon={<PlusOutlined />}
                            className="bg-green-500 text-white"
                            onClick={() => onMedia(obj.id, 'accest')}
                        />
                    </List.Item>
                    <div className="flex gap-x-2 items-end justify-end mt-3">
                        <Button
                            icon={<DeleteFilled />}
                            className="bg-red-600 text-white"
                            onClick={() => onLessonDelete(obj.id)}
                        />
                        <Button
                            icon={<EditFilled />}
                            className="bg-blue-600 text-white"
                            onClick={() => onLessonEdit(obj)}
                        />
                    </div>
                </List>

                <Modal
                    open={fileDialog}
                    onCancel={() => setFileDialog(false)}
                    footer={false}
                    width={1000}
                >
                    <div className="flex flex-col gap-y-6 mt-6">
                        <Uploader />
                        <ListEl select={true} />
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

        return (
            <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    background: token.colorBgContainer,
                }}
                items={
                    lessons && lessons.length > 0 ? (
                        lessons.map((item, index) => (
                            {
                                key: index,
                                label: item.title,
                                children: <LessonContent obj={item} />,
                                style: panelStyle
                            }
                        ))
                    ) : (null)
                }
            />
        )
    }

    // ondrawer close code
    const onDrawerClose = () => {
        setDrawerOpen({ ...drawerOpen, open: false, topicId: null });
        setLessonId(null);
        setLessons([]);
        dispatch(resetFile());
    }

    // add lesson 
    const onLessonCreate = async (values) => {
        try {
            values.topicId = drawerOpen.topicId;
            const httpReq = http(session && session.user.access)
            const { data } = await httpReq.post('/lesson/private/', values);
            setLessons([...lessons, data]);
            message.success("Topic created successfully");
        } catch (error) {
            message.error("Unable to create new lesson");
        } finally {
            lessonForm.resetFields();
            setLessonModal(false);
        }
    }

    // lesson update
    const onLessonUpdate = async (values) => {
        try {
            const httpReq = http(session && session.user.access);
            await httpReq.put(`/lesson/${editLesson.id}/`, values);
            message.success("Lesson updated successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            setEditLesson(null);
            lessonForm.resetFields();
            setLessonModal(false);
            onDrawerClose();
        }

    }

    useEffect(() => {
        const req = async () => {
            try {
                const httpReq = http(session && session.user.access);
                await httpReq.put(`/lesson/${lessonId}/`, { [key]: fileSlice.path });
                message.success("File saved successfully");
            } catch (error) {
                message.error(error.message);
            } finally {
                setKey(false);
                onDrawerClose();
            }
        }

        if (fileSlice) req();
    }, [fileSlice]);

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
                        rules={[{ required: true }]}
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
                onClose={onDrawerClose}
                open={drawerOpen.open}
                width={920}
                extra={
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className="bg-violet-500 text-white"
                        style={{ borderRadius: 0 }}
                        onClick={() => setLessonModal(true)}
                    >
                        Add Lesson
                    </Button>
                }
            >
                <Lessons />
            </Drawer>

            <Modal
                title="New Lesson"
                footer={null}
                open={lessonModal}
                onCancel={() => setLessonModal(false)}
            >
                <Form
                    layout="vertical"
                    form={lessonForm}
                    onFinish={editLesson ? onLessonUpdate : onLessonCreate}
                >
                    <Item
                        label="Title"
                        name={'title'}
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Item>
                    <Item
                        label="Video URL"
                        name={'videoUrl'}
                    >
                        <Input size="large" />
                    </Item>
                    <Item
                        label="Assets"
                        name={'accest'}
                    >
                        <Input size="large" />
                    </Item>
                    <Item>
                        <Button
                            htmlType="submit"
                            size="large"
                            className="bg-blue-500 text-white w-full"
                        >
                            {editLesson ? 'Update Lesson' : 'Submit'}
                        </Button>
                    </Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
};
export default Curriculum;