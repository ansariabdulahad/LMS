const AdminLayout = ({ children }) => {
    return (
        <div>
            <div className="p-5 bg-red-500 w-full"></div>
            <div>{children}</div>
            <div className="p-5 bg-green-500 w-full"></div>
        </div>
    )
}

export default AdminLayout;