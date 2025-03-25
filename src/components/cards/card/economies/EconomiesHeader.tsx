import cardType from "@/types/cardtype"
import { BiPlus, BiTrash } from "react-icons/bi"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { PiPlus } from "react-icons/pi"
import economyType from "@/types/economieTypes";    
import axios from "axios";
import { toast } from "react-hot-toast";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import NewEconomiesModal from "./NewEconomiesModal";
import { motion } from "framer-motion";
const EconomiesHeader = (
    {card, selectedEconomy, setSelectedEconomy, economies, setEconomies}: 
    {card: cardType, selectedEconomy: economyType | null | undefined, setSelectedEconomy: Dispatch<SetStateAction<economyType | null | undefined>>, economies: economyType[], setEconomies: Dispatch<SetStateAction<economyType[]>>}
) => {    
    
    const handleNextEconomy = () => {
        const maxIndex = economies.length-1
        const actualIndex = economies.indexOf(selectedEconomy!);

        if (actualIndex < maxIndex) {
            setSelectedEconomy(economies[actualIndex + 1]);
        }
        else if (actualIndex == maxIndex) {
            setSelectedEconomy(economies[0]);
        }
    }

    const handlePreviousEconomy = () => {
        const minIndex = 0;
        const actualIndex = economies.indexOf(selectedEconomy!);

        if (actualIndex > minIndex) {
            setSelectedEconomy(economies[actualIndex - 1]);
        }
        else if (actualIndex == minIndex) {
            setSelectedEconomy(economies[economies.length-1]);
        }
    }
    
    const handleDeleteEconomy = async () => {
        
        const response = await axios.delete("/api/economies", {
            data: {
                economyId: selectedEconomy?.id
            }
        })

        if (response.data.status == 200) {
            setEconomies((oldEconomies: economyType[]) =>
                oldEconomies.filter(economy => economy.id !== selectedEconomy?.id)
            );

            setSelectedEconomy(economies[0]);
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
    }

    return (
        <div className="">
            <NewEconomiesModal card={card} setEconomies={setEconomies}/>
            <div className="flex flex-row justify-between items-center mb-1">
                <div className="flex items-center">
                    <motion.h3 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-lg font-bold mr-2">Economies</motion.h3>

                    {economies.length == 1 && (
                        <>
                            <button className="btn btn-primary btn-xs text-xl mr-2" onClick={() => {
                                (document.getElementById("my_modal_12") as HTMLDialogElement).showModal();
                            }}><BiPlus /></button>
                        </>
                    )}

                    {economies.length > 1 && (
                        <>
                            <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="btn btn-ghost btn-sm text-xl mr-2" onClick={() => handlePreviousEconomy()}><FaChevronLeft/></motion.button>
                            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="btn btn-primary btn-xs text-xl mr-2" onClick={() => {
                                (document.getElementById("my_modal_12") as HTMLDialogElement).showModal();
                            }}><BiPlus/></motion.button>
                            <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="btn btn-ghost btn-sm text-xl mr-2" onClick={() => handleNextEconomy()}><FaChevronRight/></motion.button>
                        </>
                    )}
                </div>

                <div className="">
                    {economies.length > 0 && (
                        <motion.p className="text-sm text-primary" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            {selectedEconomy?.description}
                        </motion.p>
                    )}
                </div>

                <div className="">
                    <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="btn btn-primary btn-xs text-xl mr-2" onClick={() => {
                        (document.getElementById("my_modal_11") as HTMLDialogElement).showModal();
                        
                    }}>
                        <PiPlus/>
                    </motion.button>
                    
                    {card.economies.length > 0 && (
                        <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="btn btn-error btn-xs text-xl" onClick={() => handleDeleteEconomy()}>
                            <BiTrash/>
                        </motion.button>
                    )}
                </div>
            </div>
            <motion.div initial={{ width:"0px" }} animate={{ width:"100%" }} transition={{ duration: 0.5 }} className="divider my-0"></motion.div>
        </div>
    )
}

export default EconomiesHeader