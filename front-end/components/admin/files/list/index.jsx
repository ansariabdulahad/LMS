import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Dropdown, List } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, FolderFilled, MoreOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

const ListEl = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dir, setDir] = useState(null);

    // Items constant for dropdown option in list
    const items = [
        {
            key: '1',
            label: (
                <a
                    className='flex gap-x-2'
                >
                    <DownloadOutlined
                        className='text-violet-600'
                    />
                    Download
                </a>
            )
        },
        {
            key: '2',
            label: (
                <a
                    className='flex gap-x-2'
                >
                    <EditOutlined
                        className='text-green-600'
                    />
                    Rename
                </a>
            )
        },
        {
            key: '3',
            label: (
                <a
                    className='flex gap-x-2'
                >
                    <DeleteOutlined
                        className='text-rose-600'
                    />
                    Delete
                </a>
            )
        }
    ];

    // when pathname is changed working
    useEffect(() => {
        if (pathname) {
            let tmp = pathname.split('/');
            let path = tmp.splice(3, tmp.length - 1).join('/');
            setDir(path);
        }
    }, [pathname]);

    useEffect(() => {
        dir && s3.listObjects({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
            Prefix: dir
        }, (err, obj) => {
            console.log(err, data);
            if (err) return message.error("No data available");
            setData(obj.Contents);
        })
    }, [dir]);

    return (
        <div>
            <div className="flex mt-8 mb-4 justify-between items-center">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                />
                <Breadcrumb
                    items={
                        dir &&
                        dir.split('/').map((item, index) => (
                            index > 2 &&
                            {
                                title: <Link href={
                                    dir &&
                                    dir.split('/').splice(0, index + 1).join('/')
                                }>{item}</Link>
                            }
                        ))
                    }
                />
            </div>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    backgroundColor: '#fff'
                }}
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.Key}>
                            <List.Item.Meta
                                avatar={<FolderFilled className='text-lg text-amber-600' />}
                                title={
                                    <a
                                        href="https://ant.design"
                                        className='font-semibold'
                                    >
                                        {item.Key}
                                    </a>
                                }
                                description={
                                    <div className='flex gap-x-4 text-xs'>
                                        <label>
                                            Size : 128.50 MB
                                        </label>
                                        <label>
                                            Modified : {new Date().toLocaleDateString()}
                                        </label>
                                    </div>
                                }
                            />
                            <div>
                                <Dropdown
                                    menu={{ items }}
                                    placement='bottomRight'
                                    arrow
                                >
                                    <Button
                                        type='text'
                                        shape='circle'
                                        icon={<MoreOutlined />}
                                    />
                                </Dropdown>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
export default ListEl;