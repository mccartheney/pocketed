"use client"

import Cards from "@/components/cardsPage/CardsPage"
import Dashboard from "@/components/dashboardPage/Dashboard"
import Drawer from "@/components/drawer/Drawer"
import LoadingPage from "@/components/LoadingPage"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const Page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    if (status === "loading") return <LoadingPage />;
    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    if (!session) return <LoadingPage />

    return (
        <Drawer PageContent={Cards} userInfo={{ name: session!.user?.name!, imgUrl: session!.user?.image! }} />
    );
};

export default Page;
