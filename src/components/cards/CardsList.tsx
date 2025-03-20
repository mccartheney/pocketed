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
    // define the user
    const { user } = useUser()

    // define the state
    const [isLoading, setIsLoading] = useState <boolean>(true)

    useEffect(function getCards() {
        // method to get the cards
        const fetchCards = async () => {    
            // get the cards
            const response = await axios.get("/api/card", {
                params: { email: user?.email }  
            })

            // update the cards and end loading
            setCards(response.data.message)
            setIsLoading(false)
        }

        // get the cards
        fetchCards()
    }, [])

    // if the cards are loading, return the cards loading
    if (isLoading) {return <CardsLoading />}

    // if the user dont have any cards, return the cards 404
    if (cards.length == 0) {return <Card404/>}

    // return the cards list
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