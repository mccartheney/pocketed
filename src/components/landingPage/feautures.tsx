import { FaChartLine, FaPiggyBank, FaBell, FaMobile } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
    {
        icon: <FaChartLine className="text-4xl mb-4 text-primary" />,
        title: "Detailed Analytics",
        description: "Visualize your spending with intuitive charts and monthly reports."
    },
    {
        icon: <FaPiggyBank className="text-4xl mb-4 text-secondary" />,
        title: "Savings Goals",
        description: "Set goals and track your progress to save more effectively."
    },
    {
        icon: <FaBell className="text-4xl mb-4 text-accent" />,
        title: "Smart Alerts",
        description: "Get notifications when you're spending beyond your budget."
    },
    {
        icon: <FaMobile className="text-4xl mb-4 text-info" />,
        title: "Access Anywhere",
        description: "Track your finances on mobile, tablet, or desktop."
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto">
                        Everything you need to take control of your finances
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="card bg-base-200 hover:bg-base-300 transition-all duration-300 p-6 text-center"
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
}

export default Features;