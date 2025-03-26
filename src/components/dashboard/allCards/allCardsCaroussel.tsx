import cardType from "@/types/cardtype";
import { Dispatch, SetStateAction } from "react";
import { FaExpandAlt } from "react-icons/fa";
import { FaExpand } from "react-icons/fa6";

const AllCardsCaroussel = (
    {selectedCard, setSelectedCard, allCards}
    : 
    {selectedCard: cardType | null, setSelectedCard: Dispatch<SetStateAction<cardType | null>>, allCards: cardType[]}
) => {
    return (
        <div className="carousel w-full ">
            <ul className=" w-full list bg-base-100 rounded-box shadow-md h-full overflow-y-auto">
                { allCards.map((card) => (
                    <li className="list-row">
                        <div><img className="size-10 rounded-box" src={card.creator.imgUrl!} /></div>
                        <div>
                            <div className="font-bold">{card.name}</div>
                            <div>{card.balance}€</div>
                        </div>
                        <button className="btn btn-square btn-ghost hidden" disabled >
                        </button>
                        <button className="btn btn-square btn-ghost" onClick={() => setSelectedCard(card)}>
                            {card.id === selectedCard?.id ? <FaExpand/> : <FaExpandAlt />}
                        </button>
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}   

export default AllCardsCaroussel;