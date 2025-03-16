"use client "

import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import CardsLoading from "./CardsLoading"
import axios from "axios"
import { useUser } from "@/context/userContext"
import CardItem from "./CardItem"
import Card404 from "./Cards404"
const CardsList = (
    { cards, setCards }
    : 
    { cards: cardType[], setCards: Dispatch<SetStateAction<cardType[]>> }
) => {
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState <boolean>(true)

    useEffect(() => {
        const fetchCards = async () => {    
            const response = await axios.get("/api/card", {
                params: { email: user?.email }  
            })
            setCards(response.data.message)
            setIsLoading(false)
        }
        fetchCards()
    }, [])

    if (isLoading) {return <CardsLoading />}
    if (cards.length == 0) {return <Card404/>}
    console.log(cards)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {
                cards.map((card, index) => {
                    return (
                        <div  key={index}>
                            <CardItem userName={user?.name || ""} card={card} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardsList