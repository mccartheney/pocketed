"use client"

import Drawer from "@/components/drawer/Drawer"
import LoadingPage from "@/components/LoadingPage"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { UserProvider } from "@/context/userContext"
import userType from "@/types/userType"
import axios from "axios"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const session = useSession()
    const [user, setUser] = useState<userType | null>(null);

    useEffect(() => {
        if (session.status === "authenticated") {
            const userEmail = session.data?.user?.email
            axios.get("/api/user", {
                params: { email: userEmail }
            })
                .then(response => setUser(response.data.message))
        }
    }, [session.status])

    if (session.status === "loading" || !user) return <LoadingPage />;
    if (session.status === "unauthenticated") {
        router.push("/");
        return null;
    }

    return (
        <UserProvider value={{ user, setUser }}>
            <div className="">
                <Toaster />
                <Drawer userInfo={{ name: user.name, imgUrl: user.image! }}>{children}</Drawer>
            </div>
        </UserProvider>
    );
}

export default AppLayout