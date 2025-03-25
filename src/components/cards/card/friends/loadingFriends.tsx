import { motion } from "framer-motion"

const LoadingFriends = () => {
    return (
        <div className="w-2/6 h-full bg-base-200 rounded-2xl p-3 flex flex-col">
            {/* header */}
            <div className="flex flex-row items-center justify-between">
                <motion.div
                    className={`w-1/2 flex flex-row items-center justify-center text-sm cursor-pointer $"text-primary"`}
                    initial={{ x : 20 }}
                    animate={{ x : 0 }}
                    transition={{ duration: 0.5 }}
                >connected friends</motion.div>
                <motion.div
                    className="divider z-10 divider-horizontal"
                    initial={{ height: "0%" }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className={`w-1/2 flex flex-row items-center justify-center text-sm cursor-pointer "text-base-content"`}
                    initial={{ x : -20 }}
                    animate={{ x : 0 }}
                    transition={{ duration: 0.5 }}
                >Unconnected friends</motion.div>
            </div>

            <div className="w-full h-full skeleton mt-3"></div>
        </div>
    )
}

export default LoadingFriends