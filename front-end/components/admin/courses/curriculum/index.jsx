'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { CaretRightOutlined, DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Modal, Table, theme } from "antd";
import { useParams } from "next/navigation";
import { createContext, useState, useContext, useMemo } from "react";
import { HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Uploader from "../../files/upload";
import ListEl from "../../files/list";

const RowContext = createContext({});

const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
        <Button
            type="text"
            size="small"
            icon={<HolderOutlined />}
            style={{
                cursor: 'move',
            }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    );
};

const initialData = [
    {
        key: '1',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        lessons: 25,
        lastModified: new Date().toLocaleDateString()
    },
    {
        key: '2',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        lessons: 245,
        lastModified: new Date().toLocaleDateString()
    },
    {
        key: '3',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        lessons: 75,
        lastModified: new Date().toLocaleDateString()
    },
    {
        key: '4',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        lessons: 675,
        lastModified: new Date().toLocaleDateString()
    }
];

const Row = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    const contextValue = useMemo(
        () => ({
            setActivatorNodeRef,
            listeners,
        }),
        [setActivatorNodeRef, listeners],
    );
    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    );
};

const Curriculum = () => {
    // Hooks collection functions
    const { curriculum } = useParams();
    // State collection
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState(initialData);
    const [drawerOpen, setDrawerOpen] = useState({
        open: false,
        title: null
    });

    const columns = [
        {
            key: 'sort',
            align: 'center',
            width: 80,
            render: () => <DragHandle />,
        },
        {
            title: 'Topics',
            dataIndex: 'title',
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
            title: 'Lessons',
            dataIndex: 'lessons',
        },
        {
            title: 'Last Modified',
            dataIndex: 'lastModified',
        },
        {
            title: 'Actions',
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

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((prevState) => {
                const activeIndex = prevState.findIndex((record) => record.key === active?.id);
                const overIndex = prevState.findIndex((record) => record.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
    };

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
            <div></div>

            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
                    <Table
                        rowKey="key"
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        scroll={{
                            x: 1500,
                            y: 1200
                        }}
                        columns={columns}
                        dataSource={dataSource}
                    />
                </SortableContext>
            </DndContext>

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