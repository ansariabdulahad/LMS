'use client';
import Logo from "../shared/logo"
import { Button, Divider, Form, Input, message, Select, Tag } from "antd"
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { NEXT_PUBLIC_ENDPOINT } = process.env;
const { Item } = Form;

axios.defaults.baseURL = NEXT_PUBLIC_ENDPOINT || "http://localhost:8000";

const Register = () => {

    // handle state
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

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
    const onFinish = async (values) => {
        values.username = values.email.split("@")[0].trim();
        try {
            setLoading(true);
            await axios.post('/auth/register/', values);
            form.resetFields();
            message.success({
                content: 'Registration success, Please wait 3 sec !',
                duration: 3,
                key: 'reg-success'
            });
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            console.log(error.response.data);
            const err = error.response.data;

            if (err.hasOwnProperty('email'))
                return form.setFields([{ name: 'email', errors: err.email }])
            if (err.hasOwnProperty('mobile'))
                return form.setFields([{ name: 'mobile', errors: err.mobile }])
            message.error('Registration failed, please try again !');
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
            <div className="animate__animated animate__zoomIn md:w-8/12 flex flex-col gap-y-4 bg-white rounded-lg border p-8">
                <div className="flex items-center">
                    <h1 className="font-semibold text-2xl">Say Hi</h1>
                    <Logo />
                </div>
                <Form onFinish={onFinish} form={form} layout="vertical">
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
                            name={'fatherName'}
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
                            loading={loading}
                            className="w-full bg-indigo-600 text-white font-semibold"
                            size="large"
                            style={{ borderRadius: 0 }}
                            htmlType="submit"
                        >
                            {loading ? "Processing..." : "Register"}
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