import { motion } from "framer-motion"

const Card404 = () => {
    return (
        <div
            className="w-full h-full flex flex-col justify-center items-center"
        >
            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-8xl"
            >
                4
                <span className="inline-block rotate-12 mx-3 text-primary">$</span>
                4
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-primary"
            >
                No cards Found, create one to show here</motion.p>
        </div>
    )
}

export default Card404