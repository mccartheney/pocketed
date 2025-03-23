"use client"
import cardType, { expenseType } from "@/types/cardtype";
import axios from "axios";
import { useUser } from "@/context/userContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardInfoHeader from "@/components/cards/card/CardHeader";
import CardDeleteModel from "@/components/cards/card/CardDeletedModal";
import CardUniqueExpenses from "@/components/cards/card/unique/CardUniqueExpenses";
import AvarageMonthly from "@/components/cards/card/avarageMonthly/avarageMonthly";
import CardFriends from "@/components/cards/card/friends/CardFriends";
const Page = () => {
    // get the user
    const { user } = useUser()

    // get the card id
    const params = useParams();
    const cardId = Number(params.card)

    // get the router to redirect the user
    const router = useRouter()

    // define state
    const [card, setCard] = useState<cardType>()
    const [loading, setLoading] = useState<boolean>(true)
    const [expenses, setExpenses] = useState<expenseType[]>([])
    const [loadingTop, setLoadingTop] = useState<boolean>(true)


    // use Effect to get the card
    useEffect(function getCard() {
        // function to fetch the card
        const fetchCard = async () => {
            // get the card from api
            const response = await axios.get(`/api/card`, { params: { cardId, email: user?.email } })

            // if its ok, set the card and end the loading
            if (response.data.status == 200) {
                setCard(response.data.message)
                setLoading(false)
            }
            // if its not ok, show the error and end the loading
            else {
                toast.error(response.data.message)
                setLoading(false)
            }
        }

        fetchCard()
    }, [])

    // if its loading, show the loading page
    if (loading) return <div className="flex flex-col h-full px-3">
        <div className="skeleton flex flex-col  py-5 px-7 bg-base-200 h-[72px] rounded-2xl"></div>
        <div className="content flex flex-col h-full py-3">
            <div className="top flex h-1/2 w-full">
                <div className="skeleton md:w-4/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col"></div>
                <div className="skeleton md:w-1/5 ml-3 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col"></div>
            </div>
        </div>
    </div>

    // if the card is not found, redirect the user to the cards page
    if (!card) return router.push("/app/cards")

    // return the card page
    return (
        <div className="flex flex-col h-full px-3 overflow-hidden">
            <CardInfoHeader card={card} setCard={setCard} />
            <CardDeleteModel card={card} />

            {/* Content Wrapper with max height */}
            <div className="content flex flex-col flex-grow py-3 overflow-hidden">
                {/* Top Section */}
                <div className="top flex h-1/2 w-full">
                    <CardUniqueExpenses loading={loadingTop} setLoading={setLoadingTop} card={card} expenses={expenses} setExpenses={setExpenses} />
                    <AvarageMonthly loading={loadingTop} card={card} expenses={expenses} setExpenses={setExpenses} />
                </div>

                {/* Bottom Section */}
                <div className="bottom flex h-1/2 my-2 w-full overflow-hidden">
                    <CardFriends card={card} />
                </div>
            </div>
        </div>

    )
}

export default Page