import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa";
const Story = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="mb-4">
                            Founded in 2020, Pocketed began as a simple budgeting tool created by a frustrated financial advisor who saw clients struggling with existing solutions.
                        </p>
                        <p className="mb-4">
                            What started as a side project quickly grew into a mission to democratize financial management tools, making professional-grade insights accessible to everyone.
                        </p>
                        <p>
                            Today, we serve over 250,000 users worldwide, helping them save smarter, spend wisely, and achieve their financial goals.
                        </p>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 flex justify-center items-center rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <FaWallet className="text-[200px] mb-4 text-primary" />
                    </motion.div>
                </div>
            </div>
        </section>  
    );
};  

export default Story;