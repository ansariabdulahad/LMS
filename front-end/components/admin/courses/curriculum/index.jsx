'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { CaretRightOutlined, DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Modal, Table, theme } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import Uploader from "../../files/upload";
import ListEl from "../../files/list";
import axios from "axios";
import { http } from "@/modules/http";
import useSWR from "swr";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT || "http://127.0.0.1:8000";

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
    const { curriculum } = useParams();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('id');
    // State collection
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState({
        open: false,
        title: null
    });

    const { data: topics, error: topicError } = useSWR(
        courseId ? `/topic/course/${courseId}/` : null,
        courseId ? fetcher : null
    )

    const columns = [
        {
            title: 'Topics',
            dataIndex: 'title',
            key: 'title',
            render: (text) =>
                <a
                    href="#"
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
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className="flex gap-x-4">
                    <Button
                        icon={<EditFilled />}
                        type="text"
                        className="bg-indigo-50 text-indigo-500"
                    />
                    <Button
                        icon={<DeleteFilled />}
                        type="text"
                        className="bg-rose-50 text-rose-500"
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
                onCancel={() => setOpen(false)}
            >
                <h1>Testing modal</h1>
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