'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Modal, Table } from "antd";
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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dataSource, setDataSource] = useState(initialData);

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
            render: (text) => <a href="#" onClick={() => setDrawerOpen(true)}>{text}</a>
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
                title="Basic Drawer"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                width={920}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </AdminLayout>
    );
};
export default Curriculum;