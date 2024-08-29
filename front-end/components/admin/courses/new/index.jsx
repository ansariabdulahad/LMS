'use client';
import AdminLayout from "@/components/shared/admin-layout"
import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Image, Input, List, Select, Upload } from "antd";
import { useState } from "react";

const { Option } = Select;
const { Item } = Form;

// getbase64 function for upload filed in list
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const New = () => {

    // states handled here
    // start upload coding
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    // end upload coding

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // categories added to new curse list
    const categories = [
        {
            name: 'frontend'
        },
        {
            name: 'backend'
        },
        {
            name: 'fullstack'
        },
        {
            name: 'mernstack'
        }
    ]

    // onfinish form get values
    const onFinish = (values) => {
        console.log(values);
    }

    return (
        <AdminLayout title={'New Course'}>
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <Card title="Category" className="shadow">
                        <Form>
                            <Item
                                name={'category'}
                            >
                                <Input
                                    placeholder="Category Name"
                                    size="large"
                                    style={{ borderRadius: 0 }}
                                    suffix={
                                        <Button
                                            className="text-white bg-green-400"
                                            icon={<CheckOutlined />}
                                            type="text"
                                            shape="circle"
                                        />
                                    }
                                />
                            </Item>
                        </Form>

                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={categories}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            icon={<EditOutlined />}
                                            shape="circle"
                                            type="text"
                                            className="text-blue-600"
                                        />,
                                        <Button
                                            icon={<DeleteOutlined />}
                                            shape="circle"
                                            type="text"
                                            className="text-rose-600"
                                        />
                                    ]}
                                >
                                    {item.name}
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card title="Course Info" className="shadow">
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <div className="md:flex gap-x-6">
                                <Item
                                    label="Course Title"
                                    name={'title'}
                                    className="w-full"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'course title is required'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="React JS"
                                        size="large"
                                    />
                                </Item>
                                <Item
                                    label="Course Duration"
                                    name={'duration'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'duration is required'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="00:00"
                                        size="large"
                                        style={{ borderRadius: 0 }}
                                        addonAfter={
                                            <Item name={'time'} noStyle>
                                                <Select placeholder="Select Time" style={{ minWidth: 100 }}>
                                                    <Option value={'hours'}>Hours</Option>
                                                    <Option value={'days'}>Days</Option>
                                                    <Option value={'months'}>Months</Option>
                                                    <Option value={'years'}>Years</Option>
                                                </Select>
                                            </Item>
                                        }
                                    />
                                </Item>
                            </div>
                            <div className="md:flex gap-x-6">
                                <Item
                                    label="Category"
                                    name={'category'}
                                    className="w-full"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'category is required'
                                        }
                                    ]}
                                >
                                    <Select placeholder="Choose Category" size="large">
                                        {
                                            categories.map((item, index) => (
                                                <Option
                                                    key={index}
                                                    value={item.name.toLowerCase()}
                                                >
                                                    {item.name}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Item>
                                <Item
                                    label="Price"
                                    name={'price'}
                                    className="w-full"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'price is required'
                                        }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="2000"
                                    />
                                </Item>
                                <Item
                                    label="Discount"
                                    name={'discount'}
                                    className="w-full"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'discount is required'
                                        }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="25"
                                        addonAfter={
                                            <span className="font-bold">%</span>
                                        }
                                    />
                                </Item>
                            </div>
                            <Item
                                label="Description"
                                name={'description'}
                                className="w-full"
                                rules={[
                                    {
                                        required: true,
                                        message: 'description is required'
                                    }
                                ]}
                            >
                                <Input.TextArea
                                    size="large"
                                    placeholder="Description"
                                />
                            </Item>
                            <Item
                                label="Thumbnail"
                                name={'thumbnail'}
                                className="w-full"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thumbnail is required'
                                    }
                                ]}
                            >
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length == 0 && uploadButton}
                                </Upload>
                            </Item>
                            <div className="flex gap-x-6">
                                <Item
                                    name={'free'}
                                    valuePropName="checked"
                                >
                                    <Checkbox>
                                        Is Free
                                    </Checkbox>
                                </Item>
                                <Item
                                    name={'live'}
                                    valuePropName="checked"
                                >
                                    <Checkbox>
                                        Is Live
                                    </Checkbox>
                                </Item>
                            </div>
                            <Item>
                                <Button
                                    htmlType="submit"
                                    size="large"
                                    type="primary"
                                    className="bg-violet-600 w-full"
                                >
                                    Create
                                </Button>
                            </Item>
                        </Form>
                    </Card>
                </div>
            </div>

            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </AdminLayout>
    )
}

export default New;