import { Toaster } from "react-hot-toast"
import {motion} from "framer-motion"
import { FaPlus } from "react-icons/fa"


const CardHeaderPage = () => {
    return (
        <>
            <Toaster/>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} 
            >
                <h1 className="text-2xl mt-3">
                    My Cards
                </h1>
            </motion.div>
            
            <motion.div 
                className="divider"
                initial={{ width : 0 }}
                animate={{ width : "auto" }}
                transition={{ duration: 1 }}
            />

            <motion.button
                className="btn btn-primary"
                initial={{width : 0, opacity : 0}}
                animate={{ width: "auto", opacity: 1}}
                transition={{ duration: 1 }}
                onClick={() => document.getElementById('my_modal_1')!.showModal()}
            >
                <motion.span 
                    className="flex"
                    initial={{opacity: 0 }}
                    animate={{opacity: 1 }}
                    transition={{ duration: .4, delay:1 }}
                >
                    <FaPlus className="mr-2"/> Create New Card
                </motion.span>
            </motion.button>
        </>
    )
}

export default CardHeaderPage