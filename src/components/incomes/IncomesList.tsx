import { incomeType } from "@/types/cardtype"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
const IncomesList = (
    {
        incomes
    } : {
        incomes: incomeType[]
    }
) => {

    const [searchIncomes, setSearchIncomes] = useState<incomeType[]>(incomes)

    const incomeSearch = useRef<HTMLInputElement>(null)

    const handleSearch = () => {
        if (incomeSearch.current) {
            if (incomeSearch.current.value === "") {
                setSearchIncomes(incomes)
            } else {
                setSearchIncomes(incomes.filter(income => income.name.toLowerCase().includes(incomeSearch!.current!.value.toLowerCase())))
            }
        }
    }

    useEffect(function initializeSearch() {
        setSearchIncomes(incomes)
    }, [incomes])
    
    return (    
        <div className="flex flex-col w-full h-full p-3">
            <motion.h1 className="text-xl font-bold"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                Incomes List
            </motion.h1>
            <motion.label className="floating-label my-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <span>Income Name</span>
                <input type="text" placeholder="Salary" className="input input-md" onChange={() => handleSearch()} ref={incomeSearch}/>
            </motion.label>

            <motion.div className="divider my-0"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
            ></motion.div>

            <ul className="list mt-3 bg-base-100 rounded-box shadow-md overflow-y-auto h-[560px]">
                {searchIncomes.map((income: incomeType) => (
                    <li className="list-row">
                        <div>
                            <div>{income.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">
                                {new Date(income.date).getDate()}/{new Date(income.date).getMonth() + 1}/{new Date(income.date).getFullYear()}
                            </div>
                        </div>
                        <button className="btn btn-square btn-ghost opacity-0 disabled"></button>
                        <p>
                            {income.value} €
                        </p>
                    </li>
                ))}

                {searchIncomes.length === 0 && <motion.div className="flex flex-col w-full h-full justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-2xl font-bold">No incomes found 😠</h1>
                    <p className="text-sm text-primary">Add an income to see it here</p>
                </motion.div>}

            </ul>
        </div>
    )
}

export default IncomesList