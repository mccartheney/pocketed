"use client"

import Drawer from "@/components/drawer/Drawer"
import LoadingPage from "@/components/LoadingPage"
import {  useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"


const AppLayout = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <LoadingPage />;
    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    if (!session) return <LoadingPage />


    return (
        <div className="">
            <Toaster />
            <Drawer userInfo={{ name: session!.user?.name!, imgUrl: session!.user?.image! }}>{children}</Drawer>
        </div>

    );
}

export default AppLayout