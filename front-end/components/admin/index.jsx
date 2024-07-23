import { BellOutlined, LogoutOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import AdminLayout from "../shared/admin-layout";
import { Avatar, Badge, Button, Dropdown } from "antd";
import Link from "next/link";

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
                <h1
                    style={{
                        fontFamily: 'bela-bold'
                    }}
                    className="text-5xl"
                >Welcome to the Admin</h1>
            </div>
        </AdminLayout>
    )
}

export default Admin;