import cardType from "@/types/cardTypes"
import { motion } from "framer-motion"
import { FaChevronLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import MyChart from "./uniqueGraph";
import { useState } from "react";

const CardPage = (
    { selectedCard, setSelectedCard }: { selectedCard: cardType, setSelectedCard: React.Dispatch<React.SetStateAction<cardType | undefined>> }
) => {

    const [uniqueChartType, setUniqueChartType] = useState<"week" | "month">("week")

    return (
        <>
            <div className="">
                <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-2xl mt-3">
                        {selectedCard.name}
                    </h1>

                    <div className="mb-[-15px]">
                        <button onClick={() => { setSelectedCard(undefined) }} className="btn btn-sm btn-primary mr-3">
                            <FaChevronLeft />
                        </button>
                        <button className="btn btn-sm btn-error">
                            <MdDelete />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="divider"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 1 }}
                />
            </div>

            <div className="graphics">
                <div className="graphics_unique rounded-lg bg-base-200 p-2 w-[45%]">
                    <div className="graphics_unique_title flex items-center justify-between">
                        <h3>
                            One-time expenses
                        </h3>

                        <div className="">
                            <button onClick={() => setUniqueChartType("week")} className="btn btn-sm bg-base-100 pd-1 text-xs mr-2">
                                Week
                            </button>
                            <button onClick={() => setUniqueChartType("month")} className="btn btn-sm pd-1 bg-base-100 text-xs">
                                mounth
                            </button>
                        </div>
                    </div>

                    <div className="graphics_unique_graphic ">
                        <div className="">
                            <MyChart card={selectedCard} chartType={uniqueChartType}/>
                        </div>
                        <button className="btn btn-sm text-xs p-1 ">
                            <IoAdd /> Add new
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPage