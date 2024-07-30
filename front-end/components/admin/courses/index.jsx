'use client';
import { Button, Dropdown, Table, Tag } from "antd";
import AdminLayout from "../../shared/admin-layout";
import { CrownOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FireOutlined, MoreOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

// coursedesign function coding of column course
const courseDesign = (text, obj) => {
    return (
        <div className="flex gap-x-4">
            <Image
                src={obj.thumbnail}
                width={120}
                height={120}
                alt={obj.thumbnail}
            />
            <div>
                <Link href={`/admin/courses/${text.split(' ').join('-').toLowerCase()}`}>
                    <h1 className="capitalize font-semibold text-[16px]">
                        {text}
                    </h1>
                </Link>
                <div className="flex gap-x-1 items-center">
                    {obj.level == 'beginner' && <FireOutlined />}
                    {obj.level == 'intermediate' && <StarOutlined />}
                    {obj.level == 'advance' && <CrownOutlined />}
                    <p className="capitalize">
                        {obj.level}
                    </p>
                </div>
            </div>
        </div>
    )
}

// action design coding of column action
const actionDesign = (text, obj) => {

    const items = [
        {
            key: '1',
            label:
                <Link
                    legacyBehavior
                    href={`/admin/courses/${obj.title.split(' ').join('-').toLowerCase()}`}
                >
                    <a className="flex items-center gap-x-2">
                        <EyeOutlined className="text-violet-500" />
                        View
                    </a>
                </Link>
        },
        {
            key: '2',
            label:
                <a href="#" className="flex items-center gap-x-2">
                    <EditOutlined className="text-green-500" />
                    Edit
                </a>
        },
        {
            key: '3',
            label:
                <a href="#" className="flex items-center gap-x-2">
                    <DeleteOutlined className="text-rose-500" />
                    Delete
                </a>
        }
    ]

    return (
        <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow
        >
            <Button
                icon={<MoreOutlined />}
                type="text"
                shape="circle"
                className="bg-gray-100"
            />
        </Dropdown>
    )
}

const Courses = () => {

    // Table coding for courses
    const dataSource = [
        {
            key: '1',
            title: 'Node JS',
            thumbnail: '/images/node.png',
            level: 'beginner',
            students: 12356,
            rating: 4.5,
            status: 'live',
            action: ''
        },
        {
            key: '2',
            title: 'Laravel',
            thumbnail: '/images/laravel.png',
            level: 'intermediate',
            students: 520113,
            rating: 3.5,
            status: 'pending',
            action: ''
        },
        {
            key: '3',
            title: 'Node JS',
            thumbnail: '/images/node.png',
            level: 'advance',
            students: 12356,
            rating: 4.9,
            status: 'live',
            action: ''
        },
        {
            key: '4',
            title: 'Node JS',
            thumbnail: '/images/node.png',
            level: 'beginner',
            students: 12356,
            rating: 2.5,
            status: 'live',
            action: ''
        }
    ];

    const columns = [
        {
            title: 'Courses',
            dataIndex: 'title',
            key: 'index',
            render: courseDesign
            // render: (text, obj) => <p className="text-rose-600">{text}</p> // if u want to edit column use render function.
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            render: (text) => text.toLocaleString('en-US')
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Tag color="tomato" className="capitalize">{text}</Tag>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: actionDesign
        }
    ];

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
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{
                        x: 1500,
                        y: 1200
                    }}
                    className="shadow"
                />
            </div>
        </AdminLayout>
    )
}

export default Courses;