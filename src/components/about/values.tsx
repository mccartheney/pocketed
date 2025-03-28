import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaShieldAlt, FaLightbulb  } from "react-icons/fa";
const features = [
    {
        icon: <FaChartLine className="text-4xl mb-4 text-primary" />,
        title: "Data-Driven Insights",
        description: "We believe in making financial decisions based on clear data, not guesswork."
    },
    {
        icon: <FaUsers className="text-4xl mb-4 text-secondary" />,
        title: "User-Centric Design",
        description: "Every feature is designed with real people's financial needs in mind."
    },
    {
        icon: <FaShieldAlt className="text-4xl mb-4 text-accent" />,
        title: "Security First",
        description: "Your financial data is protected with bank-level encryption."
    },
    {
        icon: <FaLightbulb className="text-4xl mb-4 text-info" />,
        title: "Continuous Innovation",
        description: "We're constantly improving to help you stay ahead financially."
    }
];
const Values = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto">
                        The principles that guide everything we do
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="card bg-base-100 p-6 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="opacity-80">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};      

export default Values;