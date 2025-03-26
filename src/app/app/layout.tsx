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
    // get router, session and user
    const router = useRouter();
    const session = useSession()
    const [user, setUser] = useState<userType | null>(null);

    // get screen width for responsive design
    const [screenWidth, setScreenWidth] = useState(0);

    // use Effect to get the screen width
    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    useEffect(function getUserSession() {
        // if user is authenticated, get the user
        if (session.status === "authenticated") {
            const userEmail = session.data?.user?.email
            axios.get("/api/user", {
                params: { email: userEmail }
            })
                .then(response => setUser(response.data.message))
        }
    }, [session.status])

    useEffect(function handleResize() {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // if user is loading, show the loading page
    if (session.status === "loading") return <LoadingPage />;

    // if user is not authenticated, redirect to the home page
    if (session.status === "unauthenticated") {
        router.push("/");
        return null;
    }

    // if user is not found, show the loading page
    if (!user) return <LoadingPage />;

    // if user is found, show the app layout
    return (
        <UserProvider value={{ user, setUser }}>
            {/* overflow hidden for responsive design */}
            <div className="flex min-h-screen lg:h-screen">
                {screenWidth > 768 ? <Sidebar /> : <Dock />}

                <div className="flex flex-col w-full md:max-h-full">
                    <LayoutTitle />

                    {/* Garante que o conteúdo ocupe todo o espaço disponível */}
                    <main className="flex-1 flex flex-col pb-10 md:pb-0 md:h-[82%] md:overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>

        </UserProvider>
    );
}

export default AppLayout