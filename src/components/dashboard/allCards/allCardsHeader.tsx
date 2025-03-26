import { motion } from "framer-motion";
import cardType from "@/types/cardtype";
import { Dispatch, SetStateAction } from "react";

const AllCardsHeader = (
    {selectedCard, setSelectedCard, allCards}
    :
    {selectedCard: cardType | null, setSelectedCard: Dispatch<SetStateAction<cardType | null>>, allCards: cardType[]}
) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold">
                    All Cards
                </motion.h1>
            </div>

            <motion.div 
                initial={{ width : "0px"}}
                animate={{ width : "100%" }}
                transition={{ duration: 0.5 }}
                className="divider my-0">
            </motion.div>
        </div>
    )
}

export default AllCardsHeader;