import { PlusOutlined } from "@ant-design/icons";
import AdminLayout from "../shared/admin-layout";
import { Button } from "antd";

const Admin = () => {

    // Toolbar component coding
    const Toolbar = () => (
        <Button
            type="default"
            className="bg-red-600"
            size="large"
            icon={<PlusOutlined />}
            shape="circle"
        />
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