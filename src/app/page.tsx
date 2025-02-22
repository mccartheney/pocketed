"use client";
import LoadingPage from "@/components/LoadingPage";
import LoginPage from "@/components/loginPage/Login";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const session = useSession();

  
  useEffect(() => {
    if (session.status === "authenticated") router.push("dashboard");
  }, [session.status, router]);
  
  if (session.status === "loading") return <LoadingPage />;

  return (
    <LoginPage/>
  );
}
