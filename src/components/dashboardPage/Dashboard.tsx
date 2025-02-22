import { useEffect, useState } from "react"
import Cards from "./Cards"
import axios from "axios"
import { useSession } from "next-auth/react"
import cardType from "@/types/cardTypes"
import getCards from "@/utils/getCards"

const Dashboard = () => {
    const session = useSession ()
    const [cards, setCards] = useState<cardType[]>([])

    useEffect(function getUserCards() {
        getCards({email : session.data!.user!.email!, setCards : setCards})
    }, [])

    return (        
        <div className="">
            <Cards cards={cards}/>
        </div>
    )
}

export default Dashboard