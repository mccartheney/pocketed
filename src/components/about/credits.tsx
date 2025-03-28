import { motion } from "framer-motion";

const Credits = () => {
    return (
        <section className="py-8 bg-base-100 text-neutral-content">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-lg font-bold mb-2">Academic Project</h3>
                    <p className="mb-2">Final Front-End Development Project</p>
                    <p className="text-sm opacity-80">
                        Developed as part of the Web Development course at ETIC Algarve
                    </p>
                    <p className="text-xs mt-4 opacity-60">
                        © {new Date().getFullYear()} - Mccartheney Mendes
                    </p>
                </motion.div>
            </div>
        </section>
    );
};     

export default Credits;