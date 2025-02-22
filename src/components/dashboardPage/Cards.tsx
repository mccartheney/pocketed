import cardType from "@/types/cardTypes";
import { motion } from "framer-motion"
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const Cards = (
    {cards} : {cards : cardType[]}
) => {
    return (
        <motion.div
            className="cards bg-base-200 w-min p-4 rounded-xl shadow-lg"
            initial={{ width: 0, height: 0 }}
            animate={{ width : "min-content", height : "min-content" }}
            transition={{ duration: .5 }}
        >
            <motion.div
                initial = {{opacity : 0}}
                animate = {{opacity : 1}}
                transition={{ duration: .7, delay: .8 }}
            >
                <div className="cards_title flex justify-between px-4">
                    <h2 className="">
                        My Cards
                    </h2>

                    <div className="cards_title_btns flex">
                        <button className="btn btn-circle mr-[2px] btn-sm p-1 h-min min-h-0">
                            <FaAngleDoubleLeft />
                        </button>
                        <button className="btn btn-circle btn-sm p-1 h-min min-h-0">
                            <FaAngleDoubleRight />
                        </button>
                    </div>
                </div>

                <div className="">
                    <div className="stack">
                        {cards && cards.map ((card:any, index:number) => {
                            return <div key={index} className="bg-primary text-primary-content grid h-[150px] m-4 w-[250px] place-content-center rounded">
                                <h3>
                                    {card.name}
                                </h3>
                            </div>
                        })}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Cards