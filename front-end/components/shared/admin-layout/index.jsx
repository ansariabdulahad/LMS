'use client';
import { Button, Layout, Menu, Spin } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DashboardOutlined, PicCenterOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../logo';

const { Sider, Content, Header } = Layout;
const { Item } = Menu;

const AdminLayout = ({ children }) => {
    // states variables collection
    const [open, setOpen] = useState(false);
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
        }
    ];

    useEffect(() => {
        let releaseTimer = setTimeout(() => {
            setLoading(false);
        }, 2000);

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
                        />
                        <Logo />
                    </div>
                    <div>

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