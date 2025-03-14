"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserProvider } from "@/context/userContext"
import userType from "@/types/userType"
import axios from "axios"
import LoadingPage from "@/components/LoadingPage"
import Sidebar from "@/components/sideBar/Sidebar"
import Dock from "@/components/dock/Dock"
import LayoutTitle from "@/components/layoutTitle";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const session = useSession()
    const [user, setUser] = useState<userType | null>(null);
    
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        console.log(session)
        if (session.status === "authenticated") {
            const userEmail = session.data?.user?.email
            axios.get("/api/user", {
                params: { email: userEmail }
            })
                .then(response => setUser(response.data.message))
        }
    }, [session.status])

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (session.status === "loading") return <LoadingPage />;
    if (session.status === "unauthenticated") {
        router.push("/");
        return null;
    }
    if (!user) return <LoadingPage />;

    return (
        <UserProvider value={{ user, setUser }}>
            <div className="flex h-screen md:overflow-hidden"> 
                {screenWidth > 768 ? <Sidebar /> : <Dock />}
                <div className="flex flex-col flex-1">
                    <LayoutTitle/>
                    <main className="md:flex-1 lg:flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </UserProvider>
    );
}

export default AppLayout