"use client"

import Drawer from "@/components/drawer/Drawer"
import LoadingPage from "@/components/LoadingPage"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const AppLayout = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <LoadingPage />;
    if (status === "unauthenticated") {
        router.push("/app/");
        return null;
    }

    if (!session) return <LoadingPage />


    return (
        <Drawer PageContent={children} userInfo={{ name: session!.user?.name!, imgUrl: session!.user?.image! }} />

    );
}

export default AppLayout