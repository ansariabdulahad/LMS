'use client';
import Image from "next/image";
import Logo from "../shared/logo"
import { Button, Divider, Form, Input, Select, Tag } from "antd"
import Link from "next/link";

const { Item } = Form;

const Register = () => {

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

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
            <div className="animate__animated animate__zoomIn md:w-8/12 flex flex-col gap-y-4 bg-white rounded-lg border p-8">
                <div className="flex items-center">
                    <h1 className="font-semibold text-2xl">Say Hi</h1>
                    <Logo />
                </div>
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

                <Divider>OR</Divider>

                <div className="flex justify-between items-center">
                    <p>Already have an account?</p>
                    <Link
                        href={'/login'}
                        legacyBehavior
                    >
                        <a className="font-semibold text-indigo-600">Login Now</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register