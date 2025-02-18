"use client"

import Drawer from "@/components/drawer/Drawer"
import LoadingPage from "@/components/LoadingPage"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Teste = () => {
    return (<h1>
        tre
    </h1>)
}

const Page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (!session?.user?.email) return; 

        axios.get("/api/getUser", {
            params: { email: session.user.email }
        })
            .then(response => {
                console.log("User Data:", response.data);
                
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [session]); 

    if (status === "loading") return <LoadingPage />;
    if (status === "unauthenticated") {
        router.push("/");
        return null; 
    }

    if(!session) return <LoadingPage/>

    return (
        <Drawer PageContent={Teste} userInfo={{name:session!.user?.name!, imgUrl : session!.user?.image!}}/>
    );
};

export default Page;
