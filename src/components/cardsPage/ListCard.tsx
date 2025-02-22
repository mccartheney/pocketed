import cardType from "@/types/cardTypes"
import { motion } from "framer-motion"
import { FaChevronRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CardList = (
    { cards, setSelectedCard }: { cards: cardType[], setSelectedCard: React.Dispatch<React.SetStateAction<cardType | undefined>> }
) => {

   return (
       <div className="cards grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {
               cards.map((card: cardType, index: number) => {
                return <motion.div
                        className="bg-base-200 p-4 shadow-md rounded-lg"
                        key={index}
                        initial={{ width: 0, height: 0 }}
                        animate={{ width: "auto", height: "100%" }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            className="flex flex-col relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: .5, delay: .8 }}
                        >
                            <h1 className="text-primary font-bold">
                                {card.name}
                            </h1>
                            <p>
                                Total amount : {card.totalAmount} €
                            </p>
                            <div className="mt-3 flex justify-end">
                                <button className="btn btn-sm mr-2 btn-primary" onClick={() => setSelectedCard(card)}>
                                    <FaChevronRight />
                                </button>

                                <button className="btn btn-sm btn-error">
                                    <MdDelete />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
               })
        }
    </div>
   )
}

export default CardList