import { motion } from "framer-motion"

const NoHaveMoreFriends = () => {
    return (
        <motion.div 
            className="flex flex-col items-center justify-center text-sm h-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-center mb-4 text-base-content text-lg">sorry buddy, you don't more friends to connect 😔,</p>
            <br />
            <p className="text-center mb-4 text-primary-content">connect with more friends to continue sharing expenses</p>
            <br />
        </motion.div>
    )
}

export default NoHaveMoreFriends