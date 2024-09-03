'use client';
import { Avatar, Badge, Breadcrumb, Button, Drawer, Dropdown, Layout, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertOutlined, BellOutlined, CloseOutlined, DashboardOutlined, FileOutlined, LogoutOutlined, MailOutlined, PicCenterOutlined, SettingOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../logo';
import { redirect, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const { Sider, Content, Header } = Layout;
const { Item } = Menu;

const AdminLayout = ({ children, title = null, toolbar = null }) => {
    // hooks collection
    const { data: session } = useSession();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [margin, setMargin] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Menus data
    const menus = [
        {
            'label': <Link href={'/admin'}>{'Dashboard'}</Link>,
            'key': '/admin',
            'icon': <DashboardOutlined />,
            'name': 'Dashboard',
        },
        {
            'label': <Link href={'/admin/courses'}>{'Courses'}</Link>,
            'key': '/admin/courses',
            'icon': <VideoCameraOutlined />,
            'name': 'Courses',
        },
        {
            'label': <Link href={'/admin/students'}>{'Students'}</Link>,
            'key': '/admin/students',
            'icon': <UserOutlined />,
            'name': 'Students',
        },
        {
            'label': <Link href={'/admin/files'}>{'Files & Media'}</Link>,
            'key': '/admin/files',
            'icon': <FileOutlined />,
            'name': 'Files & Media'
        },
        {
            'label': <Link href={'/admin/sales'}>{'Sales & Revenue'}</Link>,
            'key': '/admin/sales',
            'icon': <AlertOutlined />,
            'name': 'Sales & Revenue'
        },
        {
            'label': <Link href={'/admin/settings'}>{'Settings'}</Link>,
            'key': '/admin/settings',
            'icon': <SettingOutlined />,
            'name': 'Settings'
        }
    ];

    // Toolbar items for dropdown
    const items = [
        {
            key: '1',
            label: (
                <Link href={"#"} legacyBehavior>
                    <a
                        href="#"
                        className="flex items-center gap-x-2 capitalize"
                    >
                        <UserOutlined />
                        {session && session?.user?.name}
                    </a>
                </Link>
            )
        },
        {
            key: '2',
            label: (
                <Link href={"#"} legacyBehavior>
                    <a
                        href="#"
                        className="flex items-center gap-x-2"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        <LogoutOutlined />
                        Logout
                    </a>
                </Link>
            )
        }
    ]

    // handled login for mobile devices
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = (e) => setIsMobile(e.matches);

        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, [isMobile]);

    // useEffect coding for header and sider controlling
    useEffect(() => {
        if (open) {
            setMargin(200);
        } else {
            setMargin(78);
        }
    }, [open]);

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

    // breadItems function for route access
    const breadItems = () => {
        const items = pathname.split('/').map((item, index) => (
            {
                title:
                    <Link href={
                        pathname.split(`/${item}`)[0] + `/${item}`
                    }>
                        {item}
                    </Link>
            }
        ));
        return items;
    }

    // check session and handle logic accordingly
    if (session) {
        if (session && session?.user?.userType !== 'admin')
            return redirect('/');
    } else {
        return redirect('/login');
    }

    return (
        <Layout>

            {
                isMobile ?
                    <Drawer
                        open={open}
                        width={260}
                        closeIcon={false}
                        placement='left'
                        title={<Logo />}
                        extra={
                            <Button onClick={() => setOpen(false)}>
                                <CloseOutlined />
                            </Button>
                        }
                    >
                        <div className='flex flex-col gap-y-4'>
                            {
                                menus?.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.key}
                                        className='flex items-center gap-4'
                                        onClick={() => setOpen(false)}
                                    >
                                        <Button
                                            icon={item.icon}
                                            shape='circle'
                                        />
                                        {item.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </Drawer>
                    :
                    <Sider Sider
                        theme='light'
                        trigger={null}
                        collapsed={!open}
                        collapsible
                        className='min-h-screen'
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <div className='py-4'>
                            <Logo />
                        </div>
                        <Menu
                            items={menus}
                            selectedKeys={pathname}
                        />
                    </Sider>
            }

            <Layout
                style={{
                    marginLeft: isMobile ? "" : margin,
                    transition: '0.2s ease'
                }}
            >
                <Header
                    className='px-6 bg-white flex justify-between items-center shadow-sm'
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 100,
                        width: '100%',
                    }}
                >
                    <div className='flex items-center'>
                        <Button
                            onClick={() => setOpen(!open)}
                            icon={<PicCenterOutlined />}
                            className='mx-2'
                        />
                        <div>
                            {
                                isMobile
                                    ? ""
                                    : title &&
                                    <h1 className='text-lg font-semibold capitalize'>{title}</h1>
                            }
                        </div>
                    </div>
                    <div className='flex items-center md:gap-x-4 gap-x-2'>
                        {toolbar && toolbar}
                        <Button
                            icon={<MailOutlined />}
                            className="bg-green-100 text-green-600"
                            size={isMobile ? "small" : "large"}
                            shape="circle"
                        />
                        <Button
                            icon={
                                <Badge count={5} size={isMobile ? "small" : "large"}>
                                    <BellOutlined />
                                </Badge>
                            }
                            className="bg-orange-100 text-orange-600"
                            size={isMobile ? "small" : "large"}
                            shape="circle"
                        />
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
                                        ? <Avatar size={isMobile ? "small" : "large"} shape='circle' src={session.user.image} />
                                        : <Avatar size={isMobile ? "small" : "large"} shape='circle' className='md:text-2xl capitalize font-bold bg-rose-400'>{session?.user.name[0]}</Avatar>
                                    : <Avatar size={isMobile ? "small" : "large"} shape='circle' icon={<UserOutlined />} />
                            }
                        </Dropdown>
                    </div>
                </Header>
                <Content className='flex flex-col gap-y-6 py-6 px-8 min-h-screen'>
                    <Breadcrumb
                        items={breadItems()}
                    />
                    {children}
                </Content>
            </Layout>
        </Layout >
    )
}

export default AdminLayout;