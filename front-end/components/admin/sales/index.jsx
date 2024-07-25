'use client';
import { Card, Table } from "antd";
import AdminLayout from "@/components/shared/admin-layout";

const Sales = () => {

    // sales array for table
    const sales = [
        {
            key: '1',
            name: 'Amit Kumar',
            email: 'amit@gmail.com',
            course: 'nodejs',
            amount: 3000,
            createdAt: new Date().toLocaleDateString()
        },
        {
            key: '2',
            name: 'Alok Kumar',
            email: 'alok@gmail.com',
            course: 'reactjs',
            amount: 2000,
            createdAt: new Date().toLocaleDateString()
        },
        {
            key: '3',
            name: 'Ahad Ansari',
            email: 'ahad@gmail.com',
            course: 'nextjs',
            amount: 5000,
            createdAt: new Date().toLocaleDateString()
        },
        {
            key: '4',
            name: 'noor',
            email: 'noor@gmail.com',
            course: 'vuejs',
            amount: 1000,
            createdAt: new Date().toLocaleDateString()
        }
    ]

    // columns for table 
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Course",
            dataIndex: "course",
            key: "course"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount"
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            key: "createdAt"
        }
    ]

    return (
        <AdminLayout title={'Sales & Revenue'}>
            <div className="flex flex-col gap-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <Card
                        title={
                            <h1 className="text-xl font-semibold">Sales & Revenue</h1>
                        }
                    >
                        <h1
                            className="text-4xl font-bold"
                        >₹ 56,1200</h1>
                    </Card>
                    <Card
                        title={
                            <h1 className="text-xl font-semibold">Expenses</h1>
                        }
                    >
                        <h1
                            className="text-4xl font-bold"
                        >₹ 19,1200</h1>
                    </Card>
                    <Card
                        title={
                            <h1 className="text-xl font-semibold">Net Income</h1>
                        }
                    >
                        <h1
                            className="text-4xl font-bold"
                        >₹ 60,1200</h1>
                    </Card>
                </div>
                <Table
                    dataSource={sales}
                    columns={columns}
                    className="shadow-lg"
                />
            </div>
        </AdminLayout>
    )
}

export default Sales;