'use client';
import { Button, Layout, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertOutlined, DashboardOutlined, FileOutlined, PicCenterOutlined, SettingOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../logo';

const { Sider, Content, Header } = Layout;
const { Item } = Menu;

const AdminLayout = ({ children, title = null, toolbar = null }) => {
    // states variables collection
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    // Menus data
    const menus = [
        {
            'label': 'Dashboard',
            'href': '/admin',
            'icon': <DashboardOutlined />
        },
        {
            'label': 'Courses',
            'href': '/admin/courses',
            'icon': <VideoCameraOutlined />
        },
        {
            'label': 'Students',
            'href': '/admin/students',
            'icon': <UserOutlined />
        },
        {
            'label': 'Files & Media',
            'href': '/admin/files',
            'icon': <FileOutlined />
        },
        {
            'label': 'Sales & Revenue',
            'href': '/admin/sales',
            'icon': <AlertOutlined />
        },
        {
            'label': 'Settings',
            'href': '/admin/settings',
            'icon': <SettingOutlined />
        }
    ];

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
            <Sider
                theme='light'
                trigger={null}
                collapsed={!open}
                collapsible
                className='min-h-screen'
            >
                <div className='py-4'>
                    <Logo />
                </div>
                <Menu>
                    {
                        menus.map((item, index) => (
                            <Item
                                key={index}
                                icon={item.icon}
                            >
                                <Link href={item.href}>{item.label}</Link>
                            </Item>
                        ))
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header className='px-6 bg-white flex justify-between items-center'>
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
                    </div>
                </Header>
                <Content className='p-8'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;