"use client"
import { motion } from 'framer-motion';
import { FaChartLine, FaCoins, FaPiggyBank } from 'react-icons/fa';

const LoadingInternalPage = () => {
    const financialIcons = [FaChartLine, FaCoins, FaPiggyBank];
    const message = "Loading..."

    return (
        <div data-theme="dark" className="absolute inset-0 bg-base-100 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            {/* Animated financial icons carousel */}
            <div className="relative h-16 w-16 mb-6">
                {financialIcons.map((Icon, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [20, 0, -20],
                            scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: financialIcons.length * 0.3,
                            delay: index * 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <Icon className="text-3xl text-primary" />
                    </motion.div>
                ))}
            </div>

            {/* Loading text with progress */}
            <div className="text-center max-w-xs">
                <motion.p
                    className="font-medium mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {message}
                </motion.p>

                {/* Minimal progress indicator */}
                <motion.div
                    className="h-1 bg-base-200 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <div className="h-full bg-gradient-to-r from-primary to-secondary" />
                </motion.div>
            </div>

            {/* Optional subtle watermark */}
            <motion.div
                className="absolute bottom-4 text-xs opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1 }}
            >
                Secured Connection • Encrypted Data
            </motion.div>
        </div>
    );
};

export default LoadingInternalPage;