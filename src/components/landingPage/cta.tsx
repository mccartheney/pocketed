import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
    return (
        <section className="py-20 bg-primary text-primary-content">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-6">Ready to transform your finances?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Start today and gain total control over your money in minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login" className="btn btn-secondary btn-lg">
                            <button className="btn btn-secondary btn-lg">
                                Try for free
                            </button>
                        </Link>
                        <Link href="https://github.com/mccartheney">
                            <button className="btn btn-outline btn-lg btn-primary-content">
                                Talk to our team
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTA;