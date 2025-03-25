import cardType from "@/types/cardtype"
import EconomiesHeader from "./EconomiesHeader"
import EconomiesGraph from "./EconomiesGraph"
import NewEconomiesModal from "./NewEconomiesModal"
import { useEffect, useState } from "react";
import economyType, { historicType } from "@/types/economieTypes";
import EconomiesAddHistory from "./EconomiesAddHistory";
import { motion } from "framer-motion";
const Economies = (
    { card }: { card: cardType }    
) => {

    const [economies, setEconomies] = useState<economyType[]>(card.economies);
    const [selectedEconomy, setSelectedEconomy] = useState<economyType | null>();
    const [history, setHistory] = useState<historicType[]>([]);
 

    useEffect(() => {
        if (economies.length > 0) {
            setSelectedEconomy(economies[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedEconomy) {
            setHistory(selectedEconomy.historic);
        }
    }, [selectedEconomy]);

    if (economies.length === 0) return (
        <div className="w-2/6 h-full ml-3 bg-base-200 rounded-2xl p-3 flex flex-col">
            <EconomiesHeader card={card} economies={economies} setEconomies={setEconomies} selectedEconomy={selectedEconomy} setSelectedEconomy={setSelectedEconomy} />
            <div className="flex flex-col items-center justify-center h-full">
                <motion.p className="text-center text-2xl font-bold" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>No economies found</motion.p>
                <motion.p className="text-center text-sm text-primary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>Add an economy to this card, pls 🥺</motion.p>
            </div>
        </div>
    )

    return (
        <div className="w-2/6 h-full ml-3 bg-base-200 rounded-2xl p-3 flex flex-col">
            <EconomiesHeader card={card} economies={economies} setEconomies={setEconomies} selectedEconomy={selectedEconomy} setSelectedEconomy={setSelectedEconomy} />
            <EconomiesGraph  history={history} />
            <NewEconomiesModal card={card} setEconomies={setEconomies}/>
            <EconomiesAddHistory  setHistory={setHistory} selectedEconomy={selectedEconomy} setEconomies={setEconomies}/>
        </div>
    )
}

export default Economies