import { CheckCircleFilled, DeleteFilled } from '@ant-design/icons'
import { Button, message, Skeleton, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import s3 from '@/modules/aws';
import { DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { useDispatch, useSelector } from 'react-redux';
import { setFile } from '@/redux/slices/file.slice';

const ListEl = ({ select }) => {
    const dispatch = useDispatch();
    const uploadSlice = useSelector(state => state.uploadSlice);
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [validate, setValidate] = useState(0);

    // onselect
    const onselect = (item) => {
        dispatch(setFile(item));
    }

    // columns
    const columns = [
        {
            title: 'File',
            dataIndex: 'file',
            key: 'file'
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path'
        },
        {
            title: 'Last Modified',
            dataIndex: 'modified',
            key: 'modified'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, item) => (
                <Fragment>
                    <Button
                        onClick={() => onDelete(item)}
                        icon={<DeleteFilled />}
                        className='text-rose-500'
                        type='text'
                    />
                    {
                        select && (
                            <Button
                                onClick={() => onselect(item)}
                                icon={<CheckCircleFilled />}
                                className='text-indigo-500'
                                type='text'
                            />
                        )
                    }
                </Fragment>
            )
        }
    ]

    // onDelete
    const onDelete = async (item) => {
        try {
            const command = new DeleteObjectCommand({
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
                Key: item.path
            });
            await s3.send(command);
            setValidate(validate + 1);
            message.success("File deleted successfully");
        } catch (error) {
            console.log(error);
            message.error("Error occurred while deleting");
        }
    }

    useEffect(() => {

        const readS3List = async () => {
            const command = new ListObjectsV2Command({
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
                Prefix: (session && session?.user?.user_id).toString()
            });

            try {
                const obj = await s3.send(command);

                const modified = obj && obj?.Contents?.map((item) => {
                    let tmp = item.Key.split('/');
                    return {
                        file: tmp[tmp.length - 1],
                        path: item.Key,
                        size: item.Size,
                        modified: item.LastModified.toLocaleDateString() + " " + item.LastModified.toLocaleTimeString()
                    }
                });
                setData(modified);

            } catch (error) {
                message.error(error.message);
            }
        }
        readS3List();
    }, [validate, uploadSlice]);

    if (!data) return <Skeleton active />

    return (
        <Table
            dataSource={data}
            columns={columns}
            className='shadow-lg mt-5'
            scroll={{
                x: 1500,
                y: 1200
            }}
        />
    )
}

export default ListEl