"use client"

import AllCards from "@/components/dashboard/allCards/allCards"
import ExpensesIncomesGraph from "@/components/dashboard/expensesIncomesGraph/expIncGraph"
import ExpensesIncomesList from "@/components/dashboard/ExpensesIncomesList/ExpIncList"
import FriendsCardGraph from "@/components/dashboard/friendsCardGraph/friendsCardGraph"
import FriendsList from "@/components/dashboard/friendsList/friendsList"
import cardType from "@/types/cardtype"
import { useEffect, useState } from "react"
import { useUser } from "@/context/userContext"
import axios from "axios"
const Page =() => {

    const {user} = useUser();
    const [allCards, setAllCards] = useState<cardType[]>([]);       
    const [selectedCard, setSelectedCard] = useState<cardType | null >(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(function initializeCards(){
        const getCards = async () => {
            const response = await axios.get("/api/card", {
                params: {
                    email: user?.email
                }
            })
            setAllCards(response.data.message);
        }
        getCards();
    },[])

    useEffect(function initializeSelectedCard(){
        if (allCards.length > 0) {
            setSelectedCard(allCards[0]);
        }
        setLoading(false)
    },[allCards])

    if (loading) {
        return  <div className="h-full  flex flex-col">

        <div className="w-full lg:h-1/2  rounded-2xl px-3 lg:mb-3 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4  h-full bg-base-200 rounded-2xl p-3 skeleton"></div>
            <div className="w-full lg:w-3/4 mt-3 lg:mt-0 lg:ml-3 h-full bg-base-200 rounded-2xl p-3 skeleton"></div>
        </div>

        <div className="w-full lg:h-1/2  rounded-2xl px-3 flex flex-col lg:flex-row lg:pb-2 lg:mt-1">
            <div className="w-full lg:w-2/4 mt-3 lg:mt-0 lg:mr-3 h-full bg-base-200 rounded-2xl p-3 skeleton"></div>
            <div className="w-full lg:w-1/4 mt-3 lg:mt-0  h-full bg-base-200 rounded-2xl p-3 skeleton"></div>
        </div>
    </div>
    }

    return (
        <div className="h-full  flex flex-col">

            <div className="w-full lg:h-1/2  rounded-2xl px-3 lg:mb-3 flex flex-col lg:flex-row">
                <AllCards allCards={allCards} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
                <ExpensesIncomesGraph selectedCard={selectedCard} />
            </div>

            <div className="w-full lg:h-1/2  rounded-2xl px-3 flex flex-col lg:flex-row lg:pb-2 lg:mt-1">
                <ExpensesIncomesList selectedCard={selectedCard} />
                <FriendsList allCards={allCards}  />
            </div>
        </div>

    )
}

export default Page