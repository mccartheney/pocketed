import { BiPlus } from "react-icons/bi"
import { CgMore } from "react-icons/cg"
import { motion } from "framer-motion"
const AvarageMonthlyHeader = () => {
    return (
            <div className="flex justify-between items-center">
                <motion.h1
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    Avarage Monthly expenses
                </motion.h1>
                <div className="flex">
                    <motion.button className="btn btn-xs btn-primary mr-2" onClick={() => (document.getElementById('my_modal_7') as HTMLDialogElement)?.showModal()}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <BiPlus />
                    </motion.button>
                    <motion.button className="btn btn-xs btn-primary" onClick={() => (document.getElementById('my_modal_8') as HTMLDialogElement)?.showModal()}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <CgMore />
                    </motion.button>
                </div>
            </div>
    )
}
export default AvarageMonthlyHeader