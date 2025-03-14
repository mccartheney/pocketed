"use client"

import CardsHeader from "@/components/cards/CardsHeader"
import CardCreatorModal from "@/components/cards/CardCreatorModal"
import cardType from "@/types/cardtype"
import { useState } from "react"
import CardsList from "@/components/cards/CardsList"

const Page =() => {
    const [cards, setCards] = useState<cardType[]>([])

    return (
        <div className="h-full px-3 flex flex-col md:flex-col">
            <CardsHeader/>
            <CardCreatorModal setCards={setCards}/>
            <CardsList cards={cards} setCards={setCards}/>
        </div>
    )
}

export default Page