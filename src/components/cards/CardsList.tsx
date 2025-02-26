"use client"

import { useEffect, useState, Dispatch, SetStateAction } from "react"
import CardsLoading from "./CardsLoading"
import { useSession } from "next-auth/react"
import axios from "axios"
import { cardApiType } from "@/types/cardTypes"
import CardItem from "./CardItem"
import {motion} from "framer-motion"
import Card404 from "./Card404"

const CardsList = (
    { cards, setCards }: { cards: cardApiType[], setCards: Dispatch<SetStateAction<cardApiType[]>> }
) => {

    // get user name
    const session = useSession()
    const userEmail = session.data?.user?.email!
    const userName = session.data?.user?.name!

    // define states
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(function getUserCards () {
        // get user cards and turn loading false
        axios.get("/api/cards", {
            params: {"email" : userEmail}
        })
            .then(response => {
                setCards(response.data.message)
                setLoading(false)
            })
    },[])

    if (loading) return <CardsLoading/>
    
    if (cards?.length === 0) {
        return <Card404/>
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {
                cards.map((card, index) => {
                    return (
                        <div className="" key={index}>
                            <CardItem userName={userName} card={card} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardsList