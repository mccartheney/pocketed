import { motion } from "framer-motion";

const FriendsListHeader = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold">
                    Friends
                </motion.h1>
            </div>

            <motion.div
                initial={{ width: "0px" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
                className="divider my-0">
            </motion.div>   
        </>
    )
}   

export default FriendsListHeader;