import AdminLayout from "../shared/admin-layout";

const Admin = () => {
    return (
        <AdminLayout>
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