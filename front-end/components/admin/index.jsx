'use client';
import { AlertOutlined, BellOutlined, FileDoneOutlined, LogoutOutlined, MailOutlined, SettingOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import AdminLayout from "../shared/admin-layout";
import { Avatar, Badge, Button, Card, Divider, Dropdown, List } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";

// use dynamic function to remove window or doc is not define error - we use while using some component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false
});

const Admin = () => {

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

    // List item for recent students
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    // Apexcharts series and options
    const revenue = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    };

    // Toolbar component coding
    const Toolbar = () => (
        <>
            <>
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
            </>
        </>
    )

    return (
        <AdminLayout
            title="Dashboard"
            toolbar={<Toolbar />}
        >
            <div>
                <div className="grid md:grid-cols-4 gap-6">
                    <Card className="shadow">
                        <div className="flex justify-around items-center">
                            <div className="flex items-center flex-col gap-y-2">
                                <Button
                                    type="primary"
                                    icon={<UserOutlined />}
                                    size="large"
                                    shape="circle"
                                    className="bg-rose-600"
                                />
                                <h1 className="text-xl font-semibold text-rose-600">
                                    Students
                                </h1>
                            </div>
                            <Divider
                                type="vertical"
                                className="h-24"
                            />
                            <div>
                                <h1 className="text-5xl font-bold text-rose-400">
                                    45K
                                </h1>
                                <p className="text-xl mt-1 text-rose-300">
                                    44,526
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="shadow">
                        <div className="flex justify-around items-center">
                            <div className="flex items-center flex-col gap-y-2">
                                <Button
                                    type="primary"
                                    icon={<VideoCameraOutlined />}
                                    size="large"
                                    shape="circle"
                                    className="bg-green-600"
                                />
                                <h1 className="text-xl font-semibold text-green-600">
                                    Courses
                                </h1>
                            </div>
                            <Divider
                                type="vertical"
                                className="h-24"
                            />
                            <div>
                                <h1 className="text-5xl font-bold text-green-400">
                                    25K
                                </h1>
                                <p className="text-xl mt-1 text-green-300">
                                    24,526
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="shadow">
                        <div className="flex justify-around items-center">
                            <div className="flex items-center flex-col gap-y-2">
                                <Button
                                    type="primary"
                                    icon={<FileDoneOutlined />}
                                    size="large"
                                    shape="circle"
                                    className="bg-orange-600"
                                />
                                <h1 className="text-xl font-semibold text-orange-600">
                                    Files
                                </h1>
                            </div>
                            <Divider
                                type="vertical"
                                className="h-24"
                            />
                            <div>
                                <h1 className="text-5xl font-bold text-orange-400">
                                    18K
                                </h1>
                                <p className="text-xl mt-1 text-orange-300">
                                    17,526
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="shadow">
                        <div className="flex justify-around items-center">
                            <div className="flex items-center flex-col gap-y-2">
                                <Button
                                    type="primary"
                                    icon={<AlertOutlined />}
                                    size="large"
                                    shape="circle"
                                    className="bg-blue-600"
                                />
                                <h1 className="text-xl font-semibold text-blue-600">
                                    Sales
                                </h1>
                            </div>
                            <Divider
                                type="vertical"
                                className="h-24"
                            />
                            <div>
                                <h1 className="text-5xl font-bold text-blue-400">
                                    88K
                                </h1>
                                <p className="text-xl mt-1 text-blue-300">
                                    87,526
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="shadow col-span-2">
                        <ReactApexChart
                            options={revenue.options}
                            series={revenue.series}
                            type="area"
                            height={300}
                        />
                    </Card>
                    <Card
                        className="shadow"
                        title="Recent Students"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="#" className="font-semibold">{item.title}</a>}
                                        description="23/01/2001"
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card
                        className="shadow"
                        title="Recent Courses"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="#" className="font-semibold">{item.title}</a>}
                                        description="23/01/2001"
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Admin;