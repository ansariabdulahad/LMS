'use client';
import AdminLayout from "@/components/shared/admin-layout";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

const Curriculum = () => {

    // Hooks collection functions
    const { curriculum } = useParams();
    // State collection
    const [open, setOpen] = useState(false);

    return (
        <AdminLayout title={curriculum.split('-').join(' ')}>
            <div>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className="bg-green-500"
                    style={{ borderRadius: 0 }}
                    size="large"
                    onClick={() => setOpen(true)}
                >
                    Add Section
                </Button>
            </div>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
            >
                <h1>Testing modal</h1>
            </Modal>
        </AdminLayout>
    )
}

export default Curriculum;