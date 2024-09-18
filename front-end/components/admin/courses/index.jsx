'use client';
import { Button, Checkbox, Drawer, Dropdown, Form, Input, message, Select, Table, Tag } from "antd";
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
import { useState } from "react";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT
const { Item } = Form;
const { Option } = Select;

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
    const [courseForm] = Form.useForm();
    const [drawer, setDrawer] = useState(false);
    const [courseState, setCourseState] = useState(null);

    const fetcher = async (url) => {
        try {
            const { data } = await axios.get(url);
            return data
        } catch (error) {
            return null;
        }
    }

    const { data: courseData } = useSWR('/course/', fetcher);
    const { data: categories } = useSWR('/category/', fetcher);

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
                    <Link href={`/admin/courses/${text.split(' ').join('-').toLowerCase()}?id=${obj.id}`}>
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

    // onCourse delete coding
    const onDeleteCourse = async (id, access) => {
        try {
            const httpReq = http(access);
            await httpReq.delete(`/course/${id}/`);
            message.success("Course deleted successfully");
            mutate('/course/');
        } catch (error) {
            message.error("Unable to delete course");
        }
    }

    // onCourse update coding
    const onEditCourse = async (obj, access) => {
        setDrawer(true);
        setCourseState({
            courseId: obj.id,
            access: access
        });
        courseForm.setFieldsValue(obj);
    }

    // action design coding of column action
    const actionDesign = (text, obj) => {
        const items = [
            {
                key: '1',
                label:
                    <Link
                        legacyBehavior
                        href={`/admin/courses/${obj.title.split(' ').join('-').toLowerCase()}?id=${obj.id}`}
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
                    <a href="#" className="flex items-center gap-x-2"
                        onClick={() => onEditCourse(obj, session && session.user.access)}
                    >
                        <EditOutlined className="text-green-500" />
                        Edit
                    </a>
            },
            {
                key: '3',
                label:
                    <a href="#" className="flex items-center gap-x-2"
                        onClick={() => onDeleteCourse(obj.id, session && session.user.access)}
                    >
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
                            <Tag color="tomato" className="capitalize">Course Is Live</Tag>
                        ) : (
                            <Tag color="green" className="capitalize">Course Completed</Tag>
                        )
                    }
                    {
                        obj.free ? (
                            <Tag color="green" className="capitalize">Free Course</Tag>
                        ) : (
                            <Tag color="tomato" className="capitalize">Paid Course</Tag>
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

    // on Course update
    const onCourseUpdate = async (values) => {
        const { courseId, access } = courseState;
        try {
            const httpReq = http(access);
            await httpReq.put(`/course/${courseId}/`, values);
            message.success("Course updated successfully");
            mutate('/course/');
        } catch (error) {
            console.log(error);

            message.error("Unable to update course");
        } finally {
            courseForm.resetFields();
            setDrawer(false);
            setCourseState(null);
        }
    }

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

            <Drawer
                open={drawer}
                width={720}
                onClose={() => setDrawer(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={onCourseUpdate}
                    form={courseForm}
                >
                    <div className="grid md:grid-cols-3 gap-x-4">
                        <Item
                            label="Course Title"
                            name={'title'}
                            className="w-full"
                            rules={[
                                {
                                    required: true,
                                    message: 'course title is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="React JS"
                                size="large"
                            />
                        </Item>
                        <Item
                            label="Level"
                            name={'level'}
                            className="w-full"
                            rules={[
                                {
                                    required: true,
                                    message: 'Level is required'
                                }
                            ]}
                        >
                            <Select placeholder="Choose Level" size="large">
                                <Option value="beginner">Beginner</Option>
                                <Option value="intermediate">Intermediate</Option>
                                <Option value="advanced">Advanced</Option>
                            </Select>
                        </Item>
                        <Item
                            label="Course Duration"
                            name={'duration'}
                            rules={[
                                {
                                    required: true,
                                    message: 'duration is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="00:00"
                                size="large"
                                style={{ borderRadius: 0 }}
                                type="number"
                                addonAfter={
                                    <Item name={'durationIn'} noStyle>
                                        <Select placeholder="Select Time" style={{ minWidth: 100 }}>
                                            <Option value={'hours'}>Hours</Option>
                                            <Option value={'days'}>Days</Option>
                                            <Option value={'months'}>Months</Option>
                                            <Option value={'years'}>Years</Option>
                                        </Select>
                                    </Item>
                                }
                            />
                        </Item>
                    </div>
                    <div className="md:flex gap-x-6">
                        <Item
                            label="Category"
                            name={'category'}
                            className="w-full"
                            rules={[
                                {
                                    required: true,
                                    message: 'category is required'
                                }
                            ]}
                        >
                            <Select placeholder="Choose Category" size="large">
                                {
                                    categories &&
                                    categories.length > 0 &&
                                    categories.map((item, index) => (
                                        <Option
                                            key={index}
                                            value={item.category.toLowerCase()}
                                            className="capitalize"
                                        >
                                            {item.category}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Item>
                        <Item
                            label="Price"
                            name={'price'}
                            className="w-full"
                            rules={[
                                {
                                    required: true,
                                    message: 'price is required'
                                }
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="2000"
                                type="number"
                            />
                        </Item>
                        <Item
                            label="Discount"
                            name={'discount'}
                            className="w-full"
                            rules={[
                                {
                                    required: true,
                                    message: 'discount is required'
                                }
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="25"
                                type="number"
                                addonAfter={
                                    <span className="font-bold">%</span>
                                }
                            />
                        </Item>
                    </div>
                    <Item
                        label="Description"
                        name={'description'}
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: 'description is required'
                            }
                        ]}
                    >
                        <Input.TextArea
                            size="large"
                            placeholder="Description"
                        />
                    </Item>
                    <div className="flex gap-x-6">
                        <Item
                            name={'free'}
                            valuePropName="checked"
                        >
                            <Checkbox>
                                Is Free
                            </Checkbox>
                        </Item>
                        <Item
                            name={'live'}
                            valuePropName="checked"
                        >
                            <Checkbox>
                                Is Live
                            </Checkbox>
                        </Item>
                    </div>
                    <Item>
                        <Button
                            htmlType="submit"
                            size="large"
                            type="primary"
                            className="bg-rose-600 w-full"
                        >
                            Update Course
                        </Button>
                    </Item>
                </Form>
            </Drawer>
        </AdminLayout>
    )
}

export default Courses;