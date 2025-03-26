import { motion } from "framer-motion";

const IncomesHeader = () => {
    return (
        <div className="w-full h-20 text-2xl font-bold flex justify-start items-center bg-base-200 rounded-2xl p-3">
            <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                Incomes
            </motion.h1>
            
        </div>
    )
}

export default IncomesHeader;