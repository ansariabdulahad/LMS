'use client';
import { Button, Dropdown, message, Table, Tag } from "antd";
import AdminLayout from "../../shared/admin-layout";
import { ClockCircleOutlined, CrownOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FireOutlined, MoreOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import axios from "axios";
import s3 from "@/modules/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useSession } from "next-auth/react";
import { http } from "@/modules/http";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT

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

// course image handling
const onCourseImageChange = async (id, access) => {
    let input = document.createElement('input');
    input.type = "file";
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        input.remove();

        // save to s3
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
            Key: `thumbnail/${Date.now()}/${file.name}`,
            Body: file,
            ACL: 'public-read'
        }

        try {
            const data = await s3.send(new PutObjectCommand(params));
            const fileUrl = `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${params.Key}`;
            const httpReq = http(access);
            await httpReq.put(`/course/${id}/`, { image: fileUrl });
            mutate('/course/');
            message.success("Thumbnail uploaded successfully");
        } catch (error) {
            console.log(error);

            message.error(error.message);
        }
    }
}

const Courses = () => {

    const { data: session } = useSession();

    const fetcher = async (url) => {
        try {
            const { data } = await axios.get(url);
            return data
        } catch (error) {
            return null;
        }
    }

    const { data: courseData, error } = useSWR('/course/', fetcher);

    // coursedesign function coding of column course
    const courseDesign = (text, obj) => {
        return (
            <div className="flex gap-x-4">
                <button onClick={() => onCourseImageChange(obj.id, session && session.user.access)}>
                    {
                        obj.image ? (
                            <Image
                                src={obj.image}
                                width={150}
                                height={30}
                                alt={obj.title}
                            />
                        ) : (
                            <Image
                                src={'/images/placeholder.png'}
                                width={150}
                                height={100}
                                alt={obj.title}
                            />
                        )
                    }
                </button>
                <div>
                    <Link href={`/admin/courses/${text.split(' ').join('-').toLowerCase()}`}>
                        <h1 className="capitalize font-semibold text-[16px]">
                            {text}
                        </h1>
                    </Link>
                    <div className="flex gap-x-4 items-center">
                        <div className="flex gap-x-1">
                            {obj.level == 'beginner' && <FireOutlined />}
                            {obj.level == 'intermediate' && <StarOutlined />}
                            {obj.level == 'advanced' && <CrownOutlined />}
                            <p className="capitalize">
                                {obj.level}
                            </p>
                        </div>
                        <div className="flex gap-x-1">
                            <ClockCircleOutlined />
                            <p className="capitalize">
                                {obj.duration}
                            </p>
                            <p className="capitalize">
                                {obj.durationIn}
                            </p>
                        </div>
                        <p>&#8377;{obj.price}</p>
                    </div>
                    <p>{obj.description.slice(0, 50)}...</p>
                </div>
            </div>
        )
    }

    // Table coding for courses
    const columns = [
        {
            title: 'Courses',
            dataIndex: 'title',
            key: 'index',
            render: courseDesign
            // render: (text, obj) => <p className="text-rose-600">{text}</p> // if u want to edit column use render function.
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, obj) => (
                <div className="flex gap-x-2">
                    {
                        obj.live ? (
                            <Tag color="tomato" className="capitalize">Live</Tag>
                        ) : (
                            <Tag color="green" className="capitalize">Completed</Tag>
                        )
                    }
                    {
                        obj.free ? (
                            <Tag color="green" className="capitalize">Free</Tag>
                        ) : (
                            <Tag color="tomato" className="capitalize">Not Free</Tag>
                        )
                    }
                </div>
            )
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
                    dataSource={courseData ? courseData : []}
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