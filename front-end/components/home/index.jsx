'use client';

import { Button } from "antd";
import { signOut } from "next-auth/react";

const Homepage = () => {
    return (
        <div>
            <h1>Welcome to homepage</h1>
            <Button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
        </div>
    )
}

export default Homepage;