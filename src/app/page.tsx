"use client";
import LoadingPage from "@/components/LoadingPage";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  
  useEffect(() => {
    if (session.status === "authenticated") router.push("dashboard");
  }, [session.status, router]);
  
  if (session.status === "loading") return <LoadingPage />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <motion.div
        className="card w-96 bg-base-100 shadow-xl"
        initial={{ opacity: 0, y: -100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, type: "spring", stiffness: 50 }} 
      >
        <div className="card-body">
          <h1 className="text-4xl font-semibold text-center text-primary">Login</h1>
          <p className="text-center mb-4">Login With Your Favorite Account</p>
          <div className="space-y-4">
            <button
              className="btn text-white text-xl bg-slate-850 w-full hover:bg-slate-850 transition duration-300"
              onClick={() => signIn("github")}
            >
              <FaGithub className="mr-3" /> 
            </button>
            <button
              className="text-xl btn text-black bg-slate-300 w-full hover:bg-slate-400 transition duration-300"
              onClick={() => signIn("google")}
            >
              <FaGoogle className="mr-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
