"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingPage from "@/components/LoadingPage";


export default function Home() {
    // get the router to redirect the user
    const router = useRouter();
    // get the session to check if the user is authenticated
    const session = useSession();

    // use Effect to redirect the user to the app page
    useEffect(() => {
        if (session.status === "authenticated") router.push("/app/");
    }, [session.status, router]);

    // if the session is loading, show the loading page
    if (session.status === "loading") return <LoadingPage />;

    // return the login page
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
                            className="btn text-white text-xl bg-slate-850 m-0 w-full hover:bg-slate-850 transition duration-300"
                            onClick={() => signIn("github")}
                        >
                            <FaGithub />
                        </button>
                        <div className="divider">OR</div>
                        <button
                            className="text-xl btn text-black bg-slate-300 w-full hover:bg-slate-400 transition duration-300"
                            onClick={() => signIn("google")}
                        >
                            <FaGoogle />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
