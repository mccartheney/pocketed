"use client "

import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction, useState } from "react"
import CardsLoading from "./CardsLoading"
const CardsList = (
    { cards, setCards }
    : 
    { cards: cardType[], setCards: Dispatch<SetStateAction<cardType[]>> }
) => {
    const [isLoading, setIsLoading] = useState <boolean>(true)

    if (isLoading) {
        return <CardsLoading />
    }

    return (
        <div>
            <h1>Cards List</h1>
        </div>
    )
}

export default CardsList