import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Freelancer",
        content: "Pocketed helped me organize my finances like never before. I finally know where my money is going!",
        avatar: "https://picsum.photos/200"
    },
    {
        name: "Michael Chen",
        role: "Small Business Owner",
        content: "As a business owner, managing personal and business expenses was challenging. Pocketed made it simple.",
        avatar: "https://picsum.photos/200"
    },
    {
        name: "Emily Rodriguez",
        role: "Student",
        content: "I finally saved enough for my dream vacation thanks to Pocketed's goal tracking features!",
        avatar: "https://picsum.photos/200"
    }
];

const Testimonials = () => {
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
                    <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto">
                        See how Pocketed is transforming financial lives
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="card bg-base-100 p-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={testimonial.avatar} alt={testimonial.name} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <p className="text-sm opacity-70">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="opacity-90">"{testimonial.content}"</p>
                            <div className="rating rating-sm mt-4">
                                <input type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" defaultChecked />
                                <input type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" defaultChecked />
                                <input type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" defaultChecked />
                                <input type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" defaultChecked />
                                <input type="radio" name={`rating-${index}`} className="mask mask-star-2 bg-orange-400" defaultChecked />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;