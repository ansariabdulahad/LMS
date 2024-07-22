'use client';
import Image from "next/image";
import Logo from "../shared/logo"
import { Button, Divider, Form, Input } from "antd"
import Link from "next/link";

const { Item } = Form;

const Login = () => {

    // get values when form submitted
    const onFinish = (data) => {
        console.log(data);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
            <div className="animate__animated animate__zoomIn md:w-4/12 flex flex-col gap-y-4 bg-white rounded-lg border p-8">
                <div className="flex items-center">
                    <h1 className="font-semibold text-2xl">Say Hi</h1>
                    <Logo />
                </div>
                <Form onFinish={onFinish}>
                    <Item
                        name={'email'}
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
                    <Item>
                        <Button
                            className="w-full bg-indigo-600 text-white font-semibold"
                            size="large"
                            style={{ borderRadius: 0 }}
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </Item>
                </Form>

                <Divider>OR</Divider>

                <Button
                    className="py-6 font-semibold"
                    icon={<Image
                        src={'/icons/google.png'}
                        width={32} height={32}
                        alt="google"
                    />}>
                    Continue With Google
                </Button>
                <Button
                    className="py-6 font-semibold"
                    icon={<Image
                        src={'/icons/github.png'}
                        width={32} height={32}
                        alt="github"
                    />}>
                    Continue With GitHub
                </Button>
                <Divider />
                <div className="flex justify-between items-center">
                    <p>Don't have an account?</p>
                    <Link
                        href={'/register'}
                        className="font-semibold text-indigo-600"
                    >Register Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login