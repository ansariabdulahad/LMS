'use client';
import { Avatar, Badge, Breadcrumb, Button, Drawer, Dropdown, Layout, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertOutlined, BellOutlined, BookOutlined, CloseOutlined, ContactsOutlined, DashboardOutlined, EyeOutlined, FileOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MailOutlined, PicCenterOutlined, SettingOutlined, SignatureOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../logo';
import { usePathname, useRouter } from 'next/navigation';
import FooterEl from '@/components/footer';
import { signIn, signOut, useSession } from 'next-auth/react';

const { Footer, Content, Header } = Layout;
const { Item } = Menu;

// Menus data
const menus = [
    {
        'label': 'Home',
        'key': '/',
        'icon': <HomeOutlined />
    },
    {
        'label': 'Courses',
        'key': '/courses',
        'icon': <BookOutlined />
    },
    {
        'label': 'Contact',
        'key': '/contact',
        'icon': <ContactsOutlined />
    },
    {
        'label': 'Reviews',
        'key': '/reviews',
        'icon': <EyeOutlined />
    },
    {
        'label': 'Students',
        'key': '/students',
        'icon': <UserOutlined />
    },
    // {
    //     'label': 'Logout',
    //     'key': '/login',
    //     'icon': <LogoutOutlined />
    // }
];

// Toolbar for homepage menus
const Toolbar = () => {
    return (
        menus?.map((item, index) => (
            <Link Link key={index} href={item.key} >
                <Button
                    className='text-xl'
                    type='text'
                    size='large'
                >
                    {item.label}
                </Button>
            </Link >
        ))
    )
}

const HomeLayout = ({ children, title = null, toolbar = <Toolbar /> }) => {
    // hooks collection
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    console.log(session);

    // states variables collection
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // checkuser function to check user ytpe admin teacher or student
    const checkUser = () => {
        if (session?.user.userType) {
            if (session?.user.userType === 'admin')
                return router.push('/admin');

            if (session?.user.userType === 'student')
                return router.push('/students');
        }
    }

    // Toolbar items for dropdown
    const items = [
        {
            key: '1',
            label: (
                (session && session.user.userType)
                && <a
                    href="#"
                    className="flex items-center gap-x-2"
                    onClick={checkUser}
                >
                    <DashboardOutlined />
                    Profile
                </a>
            )
        },
        {
            key: '2',
            label: (
                session
                    ? <Link href={"/register"} legacyBehavior>
                        <a
                            className="flex items-center gap-x-2"
                        >
                            <UserOutlined />
                            {session?.user.name}
                        </a>
                    </Link>
                    : <Link href="/register" legacyBehavior>
                        <a
                            className="flex items-center gap-x-2"
                        >
                            <UserOutlined />
                            Register
                        </a>
                    </Link>
            )
        },
        {
            key: '3',
            label: (
                session
                    ? <Link href={"#"} legacyBehavior>
                        <a
                            className="flex items-center gap-x-2"
                            onClick={() => signOut({ callbackUrl: '/login' })}
                        >
                            <LogoutOutlined />
                            Logout
                        </a>
                    </Link>
                    : <Link href={"/login"} legacyBehavior>
                        <a
                            className="flex items-center gap-x-2"
                        >
                            <LoginOutlined />
                            Login
                        </a>
                    </Link>
            )
        }
    ]

    // setimer used for perfect page loading
    useEffect(() => {
        let releaseTimer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => {
            clearTimeout(releaseTimer);
        }
    }, [])

    // Loader
    if (loading) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spin size='large' />
        </div>
    )

    return (
        <Layout>

            <Header
                className='px-6 bg-white flex justify-between items-center shadow-sm'
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    width: '100%',
                }}
            >
                <Logo />
                <div className='justify-center items-center gap-x-4 hidden md:block'>
                    {toolbar && toolbar}
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        {
                            session
                                ? session.user.image
                                    ? <Avatar size={'large'} className='mb-2' src={session.user.image} />
                                    : <Avatar size={'large'} className='mb-2 text-2xl capitalize font-bold bg-rose-400'>{session?.user.name[0]}</Avatar>
                                : <Avatar size={'large'} className='mb-2' icon={<UserOutlined />} />
                        }
                    </Dropdown>
                </div>
                <div className='md:hidden block items-center'>
                    <Button
                        onClick={() => setOpen(true)}
                        icon={<PicCenterOutlined />}
                        className='mx-2'
                    />
                </div>
            </Header>

            <Content className='flex flex-col gap-y-6 py-6 px-8'>
                {children}
            </Content>

            <Footer className='p-0 shadow'>
                <FooterEl />
            </Footer>

            <Drawer
                open={open}
                width={260}
                onClose={() => setOpen(false)}
                extra={
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        {
                            session
                                ? session.user.image
                                    ? <Avatar size={'large'} className='mb-2' src={session.user.image} />
                                    : <Avatar size={'large'} className='mb-2 text-2xl capitalize font-bold bg-rose-400'>{session?.user.name[0]}</Avatar>
                                : <Avatar size={'large'} className='mb-2' icon={<UserOutlined />} />
                        }
                    </Dropdown>
                }
                title={<Logo />}
            >
                <div className='flex flex-col gap-y-4'>
                    {
                        menus?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.key}
                                className='flex items-center gap-4'
                            >
                                <Button
                                    icon={item.icon}
                                    shape='circle'
                                />
                                {item.label}
                            </Link>
                        ))
                    }
                </div>
            </Drawer>
        </Layout>
    )
}

export default HomeLayout;