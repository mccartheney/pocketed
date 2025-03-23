import cardType, { incomeType } from "@/types/cardtype";
import IncomesHeader from "./IncomesHeader";
import CreateIncomesModal from "./createIncomesModal";
import AllIncomesModal from "./allIncomesModal";
import { useEffect, useState } from "react";
import IncomesGraph from "./incomesGraph";      
const Incomes = ({card}: {card: cardType}) => {

    // define states
    const [incomes, setIncomes] = useState<incomeType[]>([]);

    useEffect(function getIncomes() {
        setIncomes(card.incomes);
    }, []);

    return (
        <div className="w-2/6 h-full ml-3 bg-base-200 rounded-2xl p-3 flex flex-col">
            <IncomesHeader />
            <CreateIncomesModal card={card} setIncomes={setIncomes} />
            <AllIncomesModal incomes={incomes} setIncomes={setIncomes} card={card}/>
            {incomes.length > 0 && <IncomesGraph incomes={incomes}/>}
            {incomes.length === 0 && <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">No incomes found </h1>
                <p className="text-sm text-primary">Please create an income to start tracking your incomes</p>
            </div>}
        </div>
    )
}

export default Incomes;