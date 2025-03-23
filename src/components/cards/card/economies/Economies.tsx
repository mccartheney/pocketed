import cardType from "@/types/cardtype"
import EconomiesHeader from "./EconomiesHeader"
import EconomiesGraph from "./EconomiesGraph"

const Economies = (
    { card }: { card: cardType }    
) => {
    return (
        <div className="w-2/6 h-full ml-3 bg-base-200 rounded-2xl p-3 flex flex-col">
            <EconomiesHeader card={card}/>
            <EconomiesGraph card={card}/>
        </div>
    )
}

export default Economies