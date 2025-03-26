import { FaWallet, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Welcome = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-base-100 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute bottom-1/4 left-1/4 opacity-20"
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                >
                    <FaWallet className="text-[300px] text-primary" />
                </motion.div>

                <motion.div
                    className="absolute top-1/3 right-1/4 opacity-15"
                    initial={{ y: 5 }}
                    animate={{ y: -5 }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                >
                    <FaWallet className="text-[400px] text-secondary" />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Control your <span className="text-primary">finances</span> in a easy way
                    </h1>
                    <p className="text-xl mb-10">
                        pocketed helps you manage your finances, save money and achieve your financial goals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-primary btn-lg">
                            start free
                        </button>
                        <button className="btn btn-outline btn-lg">
                            know more
                        </button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <FaArrowDown className="text-2xl opacity-70" />
            </motion.div>
        </section>
    );
}

export default Welcome;