import { motion } from "framer-motion";

const Stats = () => {
    return (
        <section className="py-20 bg-primary text-primary-content">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl font-bold mb-2">250K+</div>
                        <div className="opacity-80">Active Users</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl font-bold mb-2">$3.2B</div>
                        <div className="opacity-80">Managed Annually</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl font-bold mb-2">15+</div>
                        <div className="opacity-80">Countries</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl font-bold mb-2">24/7</div>
                        <div className="opacity-80">Support</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};  

export default Stats;