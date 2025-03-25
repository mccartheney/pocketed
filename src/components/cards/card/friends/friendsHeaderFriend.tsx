import { motion } from "framer-motion"

const FriendsHeaderFriend = () => {
    return (
        <motion.div
            className={`w-full flex flex-row items-center justify-center text-md cursor-pointer text-primary  `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >Card friends</motion.div>
    )
}

export default FriendsHeaderFriend