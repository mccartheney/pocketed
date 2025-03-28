import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative py-50 bg-gradient-to-br from-primary/10 to-base-100">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold mb-6">About Pocketed</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Empowering individuals to take control of their financial future through intuitive tools and actionable insights.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;