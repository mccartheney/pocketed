import { motion } from "framer-motion";
import Link from "next/link";
const plans = [
    {
        name: "Basic",
        price: "Free",
        period: "",
        features: [
            "Up to 5 bank accounts",
            "Monthly reports",
            "Basic goal tracking",
            "Email support"
        ],
        cta: "Get started",
        popular: false
    },
    {
        name: "Premium",
        price: "$9",
        period: "/month",
        features: [
            "Unlimited bank accounts",
            "Detailed reports",
            "Advanced goals",
            "Custom alerts",
            "Priority support"
        ],
        cta: "Subscribe",
        popular: true
    },
    {
        name: "Family",
        price: "$15",
        period: "/month",
        features: [
            "All Premium features",
            "Up to 5 members",
            "Family controls",
            "Shared reports",
            "24/7 support"
        ],
        cta: "Subscribe",
        popular: false
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto">
                        Choose the plan that fits your needs
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`card ${plan.popular ? 'border-2 border-primary' : 'border border-base-300'} bg-base-200`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-body p-6">
                                {plan.popular && (
                                    <div className="badge badge-primary absolute top-0 right-0 -mt-3 -mr-3">
                                        Popular
                                    </div>
                                )}
                                <h3 className="card-title text-2xl mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="opacity-70">{plan.period}</span>
                                </div>

                                <ul className="mb-8 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/login" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} mt-auto`}>
                                    {plan.cta}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <p className="text-center text-sm opacity-50 mt-8">
                * Im kidding, it's free
            </p>
        </section>
    );
}

export default Pricing;