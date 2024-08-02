'use client';
import { Avatar, Badge, Breadcrumb, Button, Dropdown, Layout, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertOutlined, BellOutlined, DashboardOutlined, FileOutlined, LogoutOutlined, MailOutlined, PicCenterOutlined, SettingOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../logo';
import { usePathname } from 'next/navigation';

const { Sider, Content, Header } = Layout;
const { Item } = Menu;

const AdminLayout = ({ children, title = null, toolbar = null }) => {
    // hooks collection
    const pathname = usePathname();
    // states variables collection
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [margin, setMargin] = useState(null);

    // Menus data
    const menus = [
        {
            'label': <Link href={'/admin'}>{'Dashboard'}</Link>,
            'key': '/admin',
            'icon': <DashboardOutlined />
        },
        {
            'label': <Link href={'/admin/courses'}>{'Courses'}</Link>,
            'key': '/admin/courses',
            'icon': <VideoCameraOutlined />
        },
        {
            'label': <Link href={'/admin/students'}>{'Students'}</Link>,
            'key': '/admin/students',
            'icon': <UserOutlined />
        },
        {
            'label': <Link href={'/admin/files'}>{'Files & Media'}</Link>,
            'key': '/admin/files',
            'icon': <FileOutlined />
        },
        {
            'label': <Link href={'/admin/sales'}>{'Sales & Revenue'}</Link>,
            'key': '/admin/sales',
            'icon': <AlertOutlined />
        },
        {
            'label': <Link href={'/admin/settings'}>{'Settings'}</Link>,
            'key': '/admin/settings',
            'icon': <SettingOutlined />
        }
    ];

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

    return (
        <Layout>
            <Sider
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
            <Layout
                style={{
                    marginLeft: margin,
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
                            className='mx-3'
                        />
                        <div>
                            {
                                title &&
                                <h1 className='text-lg font-semibold capitalize'>{title}</h1>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        {toolbar && toolbar}
                        <Button
                            icon={<MailOutlined />}
                            className="bg-green-100 text-green-600"
                            size="large"
                            shape="circle"
                        />
                        <Button
                            icon={
                                <Badge count={5}>
                                    <BellOutlined />
                                </Badge>
                            }
                            className="bg-orange-100 text-orange-600"
                            size="large"
                            shape="circle"
                        />
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <Avatar className="bg-red-100 text-red-600" size={'large'}>A</Avatar>
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
        </Layout>
    )
}

export default AdminLayout;