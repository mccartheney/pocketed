import { motion } from "framer-motion"
import Link from "next/link"

const NoFriends = () => {
    return (
        <motion.div 
            className="flex flex-col items-center justify-center text-sm h-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.p className="text-center mb-4 text-base-content text-lg">
                sorry buddy, you don't have any friends at all 😔,
            </motion.p>
            <br />
            <motion.p className="text-center mb-4 text-primary-content">
                connect with your friends to start sharing expenses
            </motion.p>
            <br />
            <Link href="/app/friends">
                <button className="btn btn-primary">connect with friends</button>
            </Link>
        </motion.div>
    )
}

export default NoFriends    