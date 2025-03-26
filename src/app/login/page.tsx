"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle, FaGithub, FaWallet, FaChartLine, FaPiggyBank, FaMoneyBillWave, FaCoins, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingPage from "@/components/LoadingPage";

export default function Login() {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session.status === "authenticated") router.push("/app");
    }, [session.status, router]);

    if (session.status === "loading") return <LoadingPage />;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
            {/* Left side - Enhanced Branding/Illustration */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 text-primary-content relative overflow-hidden">
                {/* Background floating icons */}
                <motion.div
                    className="absolute top-1/4 left-1/4 text-primary text-4xl"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <FaCoins />
                </motion.div>

                <motion.div
                    className="absolute bottom-1/3 right-1/5 text-primary text-3xl"
                    animate={{
                        y: [0, 10, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    <FaCreditCard />
                </motion.div>

                <motion.div
                    className="absolute top-1/3 right-1/3 text-primary text-5xl"
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    <FaMoneyBillWave />
                </motion.div>

                <motion.div
                    className="absolute bottom-1/4 left-1/5 text-primary text-2xl"
                    animate={{
                        x: [0, 10, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    }}
                >
                    <FaPiggyBank />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md text-center px-4 relative z-10"
                >
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <FaWallet className="text-4xl sm:text-5xl md:text-6xl text-primary" />
                        </motion.div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-base-content">
                        Welcome to <span className="font-extrabold">Pocketed</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl mb-4 sm:mb-6 md:mb-8 text-base-content">
                        Take control of your expenses and save smarter every day
                    </p>

                    <motion.div
                        className="flex justify-center gap-4 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-2 bg-primary-content/10 rounded-full"
                        >
                            <FaChartLine className="text-xl text-base-content" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-2 bg-primary-content/10 rounded-full"
                        >
                            <FaPiggyBank className="text-xl text-base-content" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-2 bg-primary-content/10 rounded-full"
                        >
                            <FaMoneyBillWave className="text-xl text-base-content" />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-2 bg-primary-content/10 rounded-full"
                        >
                            <FaCoins className="text-xl text-base-content" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="w-16 sm:w-24 h-1 bg-base-content mx-auto"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
            </div>

            {/* Animated Divider */}
            <motion.div
                className="hidden lg:block w-0.5 bg-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-100">
                <motion.div
                    className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-box"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="text-center mb-6 sm:mb-8 md:mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-1 sm:mb-2">Sign In</h2>
                        <p className="text-sm sm:text-base text-base-content/70">Access your expense dashboard</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <motion.button
                            onClick={() => signIn("google")}
                            className="btn btn-outline w-full gap-2 sm:gap-3 hover:bg-base-200 transition-all text-sm sm:text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaGoogle className="text-base sm:text-lg" />
                            <span className="text-base-content">Continue with Google</span>
                        </motion.button>

                        <motion.button
                            onClick={() => signIn("github")}
                            className="btn btn-outline w-full gap-2 sm:gap-3 hover:bg-base-200 transition-all text-sm sm:text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaGithub className="text-base sm:text-lg" />
                            <span className="text-base-content">Continue with GitHub</span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}