import cardType from "@/types/cardtype";
import { Dispatch, SetStateAction } from "react";
import AllCardsHeader from "./allCardsHeader";
import { motion } from "framer-motion";
import AllCardsCaroussel from "./allCardsCaroussel";

const AllCards = (
    {allCards, selectedCard, setSelectedCard} 
    :
    {allCards: cardType[], selectedCard: cardType | null, setSelectedCard: Dispatch<SetStateAction<cardType | null>>}
) => {

    if (allCards.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-1/4  h-full bg-base-200 rounded-2xl p-3 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">
                    No cards found 🤨
                </h2>
                <p className="text-sm ">
                    Add a card to your account to get started
                </p>
            </motion.div>
        )
    }

    return (
        <div className="w-full lg:w-1/4  h-full bg-base-200 rounded-2xl p-3 flex flex-col">
            <AllCardsHeader selectedCard={selectedCard} setSelectedCard={setSelectedCard} allCards={allCards}/>
            <AllCardsCaroussel selectedCard={selectedCard} setSelectedCard={setSelectedCard} allCards={allCards}/>
        </div>
    )
}

export default AllCards;