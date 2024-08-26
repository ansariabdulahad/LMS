'use client';
import { Avatar, Badge, Breadcrumb, Button, Drawer, Dropdown, Layout, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertOutlined, BellOutlined, BookOutlined, CloseOutlined, ContactsOutlined, DashboardOutlined, EyeOutlined, FileOutlined, HomeOutlined, LogoutOutlined, MailOutlined, PicCenterOutlined, SettingOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../logo';
import { usePathname } from 'next/navigation';
import FooterEl from '@/components/footer';

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
    }
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
    // states variables collection
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Toolbar items for dropdown
    const items = [
        {
            key: '1',
            label: (
                <Link href={"#"} legacyBehavior>
                    <a
                        href="/profile"
                        className="flex items-center gap-x-2"
                    >
                        <UserOutlined />
                        Profile
                    </a>
                </Link>
            )
        },
        {
            key: '2',
            label: (
                <Link href={"#"} legacyBehavior>
                    <a
                        href="/settings"
                        className="flex items-center gap-x-2"
                    >
                        <SettingOutlined />
                        Settings
                    </a>
                </Link>
            )
        },
        {
            key: '3',
            label: (
                <Link href={"#"} legacyBehavior>
                    <a
                        href="/logout"
                        className="flex items-center gap-x-2"
                    >
                        <LogoutOutlined />
                        Logout
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
                <div className='flex justify-center items-center gap-x-4 hidden md:block'>
                    {toolbar && toolbar}
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        <Avatar className="bg-red-100 text-red-600 mx-2" size={'large'}>A</Avatar>
                    </Dropdown>
                </div>
                <div className='md:hidden block flex items-center'>
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
                placement='left'
                closeIcon=""
                width={260}
                extra={
                    <Button
                        type='text'
                        icon={<CloseOutlined
                            onClick={() => setOpen(false)}
                        />}
                    />
                }
            >
                <div className='flex flex-col gap-y-4'>
                    {toolbar && toolbar}
                </div>
            </Drawer>
        </Layout>
    )
}

export default HomeLayout;