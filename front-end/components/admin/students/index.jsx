'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { BlockOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, EnvironmentOutlined, MailOutlined, MoneyCollectOutlined, MoreOutlined, SearchOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Drawer, Dropdown, Form, Input, Pagination, Select, Tag, Tooltip } from "antd";
import { useState } from "react";

const { Item } = Form;

// options to format date
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

// create an array to show students using loop until we make api for this
const students = [
    {
        name: 'alok',
        image: '/images/01.jpg',
        state: 'UP',
        payment: 8000,
        totalCourse: 12,
        createdAt: new Date().toLocaleString('en-US', options)
    },
    {
        name: 'Samad',
        image: '/images/07.jpg',
        state: 'London',
        payment: 6000,
        totalCourse: 12,
        createdAt: new Date().toLocaleString('en-US', options)
    },
    {
        name: 'Ahad',
        image: '/images/02.jpg',
        state: 'Mumbai',
        payment: 9000,
        totalCourse: 10,
        createdAt: new Date().toLocaleString('en-US', options)
    },
    {
        name: 'Noor',
        image: '/images/03.jpg',
        state: 'Bhiwandi',
        payment: 8000,
        totalCourse: 12,
        createdAt: new Date().toLocaleString('en-US', options)
    },
    {
        name: 'wahid',
        image: '/images/04.jpg',
        state: 'Bhiwandi',
        payment: 8000,
        totalCourse: 12,
        createdAt: new Date().toLocaleString('en-US', options)
    },
    {
        name: 'rahman',
        image: '/images/05.jpg',
        state: 'Bhiwandi',
        payment: 8000,
        totalCourse: 12,
        createdAt: new Date().toLocaleString('en-US', options)
    }
]

const Students = () => {

    // States collection
    const [open, setOpen] = useState(false);

    // for multiple select
    const options = [
        {
            value: 'gold',
        },
        {
            value: 'lime',
        },
        {
            value: 'green',
        },
        {
            value: 'cyan',
        },
    ];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                }}
            >
                {label}
            </Tag>
        );
    };

    // get values when form submitted
    const onFinish = (values) => {
        console.log(values);
    }

    // Adding toolbar for students page
    const Toolbar = () => {
        return (
            <>
                <>
                    <Input
                        suffix={
                            <Button
                                icon={<SearchOutlined />}
                                type="text"
                                className="text-gray-200"
                            />
                        }
                        className="border-gray-200 md:w-96"
                        placeholder="Search Students"
                        style={{ borderRadius: 0 }}
                    />
                    <Button
                        type="primary"
                        className="bg-indigo-600"
                        size="large"
                        style={{ borderRadius: 0 }}
                        icon={<UserOutlined />}
                        onClick={() => setOpen(true)}
                    >Enroll</Button>
                </>
            </>
        )
    }

    // Title design for students card
    const Title = ({ item }) => {
        return (
            <div className="flex items-center py-4 gap-x-2">
                <Avatar
                    src={item.image}
                    style={{
                        height: 48,
                        width: 48
                    }}
                />
                <div>
                    <h1 className="text-lg font-semibold capitalize">{item.name}</h1>
                    <p className="flex items-center gap-x-1 capitalize text-xs text-zinc-400">
                        <EnvironmentOutlined />
                        {item.state}
                    </p>
                </div>
            </div>
        )
    }

    // Extra component for students card
    const Extra = ({ item }) => {

        // Items for dropdown options
        const items = [
            {
                key: '1',
                label: <Button
                    shape="circle"
                    className="bg-indigo-200 text-indigo-600"
                    icon={<EditOutlined />}
                />
            },
            {
                key: '2',
                label: <Button
                    shape="circle"
                    className="bg-red-200 text-red-600"
                    icon={<DeleteOutlined />}
                />
            }
        ]

        return (
            <div>
                <Dropdown arrow placement="bottomCenter" menu={{ items }}>
                    <Button
                        type="text"
                        icon={<MoreOutlined />}
                        className="bg-gray-100"
                        shape="circle"
                    />
                </Dropdown>
            </div>
        )
    }

    // Item render function for pagination
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    return (
        <AdminLayout
            title={'Students'}
            toolbar={<Toolbar />}
        >
            <div>
                <div className="grid md:grid-cols-3 gap-6">
                    {
                        students.map((student, index) => (
                            <Card
                                key={index}
                                className="shadow-lg"
                                title={<Title item={student} />}
                                extra={<Extra item={student} />}
                            >
                                <div className="flex mb-5 justify-between items-center">
                                    <div className="flex items-center gap-x-2">
                                        <Button
                                            icon={<MoneyCollectOutlined />}
                                            shape="circle"
                                            type="text"
                                            className="bg-green-200 text-green-600"
                                        />
                                        <p className="font-semibold">Payments</p>
                                    </div>
                                    <p className="font-semibold text-zinc-500">{student.payment}</p>
                                </div>
                                <div className="flex mb-5 justify-between items-center">
                                    <div className="flex items-center gap-x-2">
                                        <Button
                                            icon={<VideoCameraOutlined />}
                                            shape="circle"
                                            type="text"
                                            className="bg-orange-200 text-orange-600"
                                        />
                                        <p className="font-semibold">Courses</p>
                                    </div>
                                    <p className="font-semibold text-zinc-500">{student.totalCourse}</p>
                                </div>
                                <div className="flex mb-5 justify-between items-center">
                                    <div className="flex items-center gap-x-2">
                                        <Button
                                            icon={<CalendarOutlined />}
                                            shape="circle"
                                            type="text"
                                            className="bg-indigo-200 text-indigo-600"
                                        />
                                        <p className="font-semibold">Joined</p>
                                    </div>
                                    <p className="font-semibold text-zinc-500">{student.createdAt}</p>
                                </div>
                                <Divider>
                                    <div className="flex gap-x-2">
                                        <Tooltip title="Message">
                                            <Button
                                                icon={<MailOutlined />}
                                                shape="circle"
                                                type="text"
                                                size="large"
                                                className="bg-blue-100 text-blue-600"
                                            />
                                        </Tooltip>
                                        <Tooltip title="Block">
                                            <Button
                                                icon={<BlockOutlined />}
                                                shape="circle"
                                                type="text"
                                                size="large"
                                                className="bg-rose-100 text-rose-600"
                                            />
                                        </Tooltip>
                                    </div>
                                </Divider>
                            </Card>
                        ))
                    }
                </div>
                <div className="flex justify-end mt-8">
                    <Pagination total={500} itemRender={itemRender} />
                </div>
            </div>

            <Drawer
                title="Enroll a Student"
                open={open}
                onClose={() => setOpen(false)}
                width={720}
            >
                <Form onFinish={onFinish} layout="vertical">
                    <div className="grid md:grid-cols-2 gap-3">
                        <Item
                            name={'fullname'}
                            label="FullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your fullname"
                                }
                            ]}
                        >
                            <Input
                                placeholder="FullName"
                                style={{ borderRadius: 0 }}
                                size="large"
                            />
                        </Item>
                        <Item
                            name={'mobile'}
                            label="Mobile"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your mobile"
                                }
                            ]}
                        >
                            <Input
                                placeholder="+91 9545282408"
                                style={{ borderRadius: 0 }}
                                size="large"
                                type="tel"
                            />
                        </Item>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <Item
                            name={'email'}
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email address"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                style={{ borderRadius: 0 }}
                                size="large"
                            />
                        </Item>
                        <Item
                            name={'password'}
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password"
                                }
                            ]}
                        >
                            <Input
                                placeholder="********"
                                style={{ borderRadius: 0 }}
                                size="large"
                                type="password"
                            />
                        </Item>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <Item
                            name={'father'}
                            label="Father Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your father name"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Father Name"
                                style={{ borderRadius: 0 }}
                                size="large"
                            />
                        </Item>
                        <Item
                            name={'dob'}
                            label="DOB"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your DOB"
                                }
                            ]}
                        >
                            <Input
                                style={{ borderRadius: 0 }}
                                size="large"
                                type="date"
                            />
                        </Item>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <Item
                            name={'qualification'}
                            label="Qualification"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your qualification"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Qualification"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    { value: '10th', label: 'High School' },
                                    { value: '12th', label: 'Intermediate' },
                                    { value: 'ug', label: 'UG' },
                                    { value: 'pg', label: 'PG' },
                                ]}
                            />
                        </Item>
                        <Item
                            name={'courses'}
                            label="Courses"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose your Courses"
                                }
                            ]}
                        >
                            <Select
                                placeholder="Choose your Courses"
                                mode="multiple"
                                tagRender={tagRender}
                                style={{
                                    width: '100%',
                                }}
                                options={options}
                            />
                        </Item>
                    </div>
                    <Item>
                        <Button
                            className="w-full bg-indigo-600 text-white font-semibold"
                            size="large"
                            style={{ borderRadius: 0 }}
                            htmlType="submit"
                        >
                            Register
                        </Button>
                    </Item>
                </Form>
            </Drawer>
        </AdminLayout>
    )
}

export default Students;