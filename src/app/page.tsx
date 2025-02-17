"use client"
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const session = useSession()
  
  if (session.status == "authenticated") router.push("dashboard")

  return (
    <h1>
      <button className="btn btn-primary" onClick={() => signIn("github")}>
        logar gitHub
      </button>
      <button className="btn btn-primary" onClick={() => signIn("google")}>
        logar Google
      </button>
    </h1>
  );
}
