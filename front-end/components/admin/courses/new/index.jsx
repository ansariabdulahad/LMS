'use client';
import AdminLayout from "@/components/shared/admin-layout"
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Empty, Form, Input, List, message, Select } from "antd";
import { http } from "@/modules/http";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import axios from "axios";

const { Option } = Select;
const { Item } = Form;

// setting base url using axios
const { NEXT_PUBLIC_ENDPOINT } = process.env;
axios.defaults.baseURL = NEXT_PUBLIC_ENDPOINT || "http://localhost:8000";

const New = () => {
    const [courseForm] = Form.useForm();
    const [categoryForm] = Form.useForm();
    const { data: session } = useSession();

    // on page load get categories
    const fetcher = async (url) => {
        try {
            // const httpReq = http(session && session.user.access);
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            return null;
        }
    }
    const { data: categories, error } = useSWR('/category/', fetcher)

    // onfinish form get values of creating course
    const onFinish = async (values) => {
        try {
            const httpReq = http(session && session?.user?.access);
            await httpReq.post('/course/private/', values);
            message.success("Course created successfully");
        } catch (error) {
            message.error("Error occurred while creating course");
        } finally {
            courseForm.resetFields();
        }
    }

    // oncategory finished get values of course
    const onCategory = async (values) => {
        try {
            const httpReq = http(session && session.user.access);
            await httpReq.post('/category/private/', values);
            mutate('/category/');
            message.success("Category has been created successfully");
        } catch (error) {
            message.error("Error occurred while creating category");
        } finally {
            categoryForm.resetFields();
        }

    }

    // on category delete
    const onCategoryDel = async (id) => {
        try {
            const httpReq = http(session && session.user.access);
            await httpReq.delete(`/category/${id}/`);
            message.success("Category deleted successfully");
            mutate('/category/');
        } catch (error) {
            message.error("Error occurred while deleting category");
        }
    }

    return (
        <AdminLayout title={'New Course'}>
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <Card title="Category" className="shadow">
                        <Form onFinish={onCategory} form={categoryForm}>
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
                                            htmlType="submit"
                                        />
                                    }
                                />
                            </Item>
                        </Form>
                        {
                            categories && categories.length > 0 ? (
                                <List
                                    className="demo-loadmore-list capitalize"
                                    itemLayout="horizontal"
                                    dataSource={categories}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    shape="circle"
                                                    type="text"
                                                    className="text-rose-600"
                                                    onClick={() => onCategoryDel(item.id)}
                                                />
                                            ]}
                                        >
                                            {item.category}
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <Empty />
                            )
                        }
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card title="Course Info" className="shadow">
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            form={courseForm}
                        >
                            <div className="grid md:grid-cols-3 gap-x-4">
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
                                    label="Level"
                                    name={'level'}
                                    className="w-full"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Level is required'
                                        }
                                    ]}
                                >
                                    <Select placeholder="Choose Level" size="large">
                                        <Option value="beginner">Beginner</Option>
                                        <Option value="intermediate">Intermediate</Option>
                                        <Option value="advanced">Advanced</Option>
                                    </Select>
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
                                            categories &&
                                            categories.length > 0 &&
                                            categories.map((item, index) => (
                                                <Option
                                                    key={index}
                                                    value={item.category.toLowerCase()}
                                                    className="capitalize"
                                                >
                                                    {item.category}
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