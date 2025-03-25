import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction } from "react"
import { FaPlus } from "react-icons/fa"
import { motion } from "framer-motion"
const CardUniqueHeader = (
    { expensesDurations, setExpensesDurations, card }: 
    { expensesDurations: "Week" | "Month", setExpensesDurations: Dispatch<SetStateAction<"Week" | "Month">>, card: cardType }
) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex">
                <motion.h4
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {expensesDurations} unique expenses
                </motion.h4>
                <motion.button 
                    onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                    className="btn btn-xs btn-soft ml-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <FaPlus />
                </motion.button>
            </div>
            <div className="">
                    <motion.button 
                        onClick={() => setExpensesDurations("Week")}
                        className={`btn btn-sm mr-3 ${expensesDurations === "Week" ? "btn-primary" : "btn-soft"}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Weekly
                    </motion.button>
                    <motion.button 
                        onClick={() => setExpensesDurations("Month")}
                        className={`btn btn-sm ${expensesDurations === "Month" ? "btn-primary" : "btn-soft"}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Monthly
                    </motion.button>
            </div>
        </div>
    )
}

export default CardUniqueHeader