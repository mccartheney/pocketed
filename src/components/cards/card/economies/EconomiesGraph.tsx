import cardType from "@/types/cardtype";

const EconomiesGraph = ({card}: {card: cardType}) => {
    return (
        <div className="flex flex-col h-full w-full p-1">
            <div className="flex flex-row justify-between items-center mb-1">
                <div className="flex items-center">
                    <h3 className="text-lg font-bold">Economies</h3>
                </div>
            </div>
        </div>
    )
}   

export default EconomiesGraph;