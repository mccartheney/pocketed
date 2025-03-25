"use client"
import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction } from "react"
import { FaPlus } from "react-icons/fa"
import { motion } from "framer-motion"
const CardsHeader = (

) => {
    
    return (
        <div className="cardHeader w-full bg-base-200 rounded-2xl p-3 h-20 ">
            <div className="cardHeader_title mt-3 relative">
                <div className="flex w-full justify-between">
                    <motion.h2 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-2xl font-bold"
                    >
                        Cards
                    </motion.h2>

                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="btn btn-sm btn-primary"
                        onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}
                    >
                        <FaPlus />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default CardsHeader