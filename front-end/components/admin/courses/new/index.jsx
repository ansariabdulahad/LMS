'use client';
import AdminLayout from "@/components/shared/admin-layout"
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, List, message, Select } from "antd";
import { http } from "@/modules/http";
import { useSession } from "next-auth/react";

const { Option } = Select;
const { Item } = Form;

const New = () => {
    const [courseForm] = Form.useForm();
    const { data: session } = useSession();

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
    const onFinish = async (values) => {
        try {
            const httpReq = http(session && session?.user?.access);
            const { data } = await httpReq.post('/course/private/', values);
            console.log(data);
            message.success("Course created successfully");
        } catch (error) {
            message.error("Error occurred while creating course");
        } finally {
            // courseForm.resetFields();
        }
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
                            form={courseForm}
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
                                        type="number"
                                        addonAfter={
                                            <Item name={'durationIn'} noStyle>
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
                                        type="number"
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
                                        type="number"
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
        </AdminLayout>
    )
}

export default New;