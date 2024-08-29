'use client';
import Image from "next/image";
import Logo from "../shared/logo"
import { Button, Divider, Form, Input } from "antd"
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Loader from "@/app/loading";
import { redirect } from "next/navigation";
import HomeLayout from "../shared/home-layout";

const { Item } = Form;

const Login = () => {

    // handling login events
    const { data: session, status } = useSession();

    if (status === 'loading') return <Loader />;
    if (status === 'authenticated') return redirect('/');

    // get values when form submitted
    const onFinish = (values) => {
        values.username = values.email.split("@")[0];
        signIn('credentials', values);
    }

    return (
        <HomeLayout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
                <div className="animate__animated animate__zoomIn md:w-4/12 flex flex-col gap-y-4 bg-white rounded-lg border p-8">
                    <div>
                        <h1 className="font-semibold text-2xl text-center">Login</h1>
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
                        onClick={() => signIn('google')}
                        className="py-6 font-semibold"
                        icon={<Image
                            src={'/icons/google.png'}
                            width={32} height={32}
                            alt="google"
                        />}>
                        Continue With Google
                    </Button>
                    <Button
                        onClick={() => signIn('github')}
                        className="py-6 font-semibold"
                        icon={<Image
                            src={'/icons/github.png'}
                            width={32} height={32}
                            alt="github"
                        />}>
                        Continue With GitHub
                    </Button>
                    <Divider />
                    <div className="flex justify-between items-center gap-2">
                        <p>Don't have an account?</p>
                        <Link
                            href={'/register'}
                            legacyBehavior
                        >
                            <a className="font-semibold text-indigo-600">Register Now</a>
                        </Link>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Login