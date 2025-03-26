import { motion } from "framer-motion";
import { SetStateAction } from "react";
import { Dispatch } from "react";

const ExpensesIncomesListHeader = ({setSearchValue}: { setSearchValue: Dispatch<SetStateAction<string>>}) => {
    return (
        <>
            <div className="flex justify-between lg:items-center flex-col lg:flex-row ">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold mb-3 lg:mb-0">
                    Expenses and Incomes list
                </motion.h1>

                <motion.label className="floating-label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span>Search</span>
                    <input type="text" placeholder="Salary" className="input input-md" onChange={(e) => setSearchValue(e.target.value)} />
                </motion.label>
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

export default ExpensesIncomesListHeader;