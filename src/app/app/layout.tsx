"use client"

import { useSession } from "next-auth/react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { UserProvider } from "@/context/userContext"
import userType from "@/types/userType"
import axios from "axios"
import LoadingPage from "@/components/LoadingPage"
import Sidebar from "@/components/sideBar/Sidebar"
import Dock from "@/components/dock/Dock"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const session = useSession()
    const [user, setUser] = useState<userType | null>(null);
    
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
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
    // update on resize
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (session.status === "loading" || !user) return <LoadingPage/>;
    if (session.status === "unauthenticated") {
        router.push("/");
        return null;
    }


    return (
        <UserProvider value= {{ user, setUser }}>
            <div className="flex" > 
                {screenWidth > 768 ? <Sidebar /> : <Dock />}
                { children }
            </div>
        </UserProvider>
    );
}

export default AppLayout