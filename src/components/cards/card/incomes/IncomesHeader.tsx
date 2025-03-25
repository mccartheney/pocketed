import { BiPlus } from "react-icons/bi";
import { CgMore } from "react-icons/cg";
import { motion } from "framer-motion";
const IncomesHeader = () => {
    return (
        <>
            <div className="flex flex-row justify-between items-center mb-2">
                <motion.h3 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="text-lg font-bold"
                >
                    Incomes
                </motion.h3>
                
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex">
                        <button className="btn btn-xs btn-primary mr-2" onClick={() => (document.getElementById('my_modal_9') as HTMLDialogElement)?.showModal()}><BiPlus /></button>
                        <button className="btn btn-xs btn-primary" onClick={() => (document.getElementById('my_modal_10') as HTMLDialogElement)?.showModal()}><CgMore /></button>
                    </div>
                </motion.div>

            </div>
            <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="divider my-0"
            />
        </>
    )
}

export default IncomesHeader;