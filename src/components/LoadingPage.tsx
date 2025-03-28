"use client"
import { motion } from 'framer-motion';
import { FaWallet, FaSpinner } from 'react-icons/fa';

const LoadingPage = () => {
    return (
        <div data-theme="dark" className="fixed inset-0 bg-base-100 z-50 flex flex-col items-center justify-center">
            {/* Animated logo */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5
                }}
                className="mb-8"
            >
                <FaWallet className="text-6xl text-primary" />
            </motion.div>

            {/* App name with loading animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
            >
                <h1 className="text-3xl font-bold">Pocketed</h1>

                {/* Spinning loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear"
                    }}
                >
                    <FaSpinner className="text-xl text-primary" />
                </motion.div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
                className="w-64 h-2 bg-base-200 rounded-full mt-8 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </div>
    );
};

export default LoadingPage;