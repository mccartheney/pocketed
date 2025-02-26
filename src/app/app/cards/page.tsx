"use client"
import CardsHeader from "@/components/cards/CardsHeader"
import CardsList from "@/components/cards/CardsList"
import CreateCardModel from "@/components/cards/CreateCardModal"
import { cardApiType } from "@/types/cardTypes"
import { useState } from "react"

const Page = () => {
    const [cards, setCards] = useState<cardApiType[]>([])

    return (
        <>
            <CardsHeader />
            <CardsList cards={cards} setCards={setCards}/>
            <CreateCardModel setCards={setCards} />
        </>
    )
}

export default Page