"use client"
import cardType from "@/types/cardtype";
import axios from "axios";
import { useUser } from "@/context/userContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardInfoHeader from "@/components/cards/card/CardHeader";
import CardDeleteModel from "@/components/cards/card/CardDeletedModal";
import CardUniqueExpenses from "@/components/cards/card/unique/CardUniqueExpenses";

const Page = () => {
    const { user } = useUser()
    const params = useParams();
    const cardId = Number(params.card)

    const router = useRouter()

    const [card, setCard] = useState<cardType>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(function getCard() {
        const fetchCard = async () => {
            const response = await axios.get(`/api/card`, { params: { cardId, email: user?.email } })
            if (response.data.status == 200) {
                setCard(response.data.message)
                setLoading(false)
            }
            else {
                toast.error(response.data.message)
                setLoading(false)
            }
        }
        fetchCard()
    }, [])

    if (loading) return <div className="flex flex-col h-full px-3">
        <div className="skeleton flex flex-col  py-5 px-7 bg-base-200 h-[72px] rounded-2xl"></div>
        <div className="content flex flex-col h-full py-3">
            <div className="top flex h-1/2 w-full">
                <div className="skeleton md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col"></div>
            </div>
        </div>
    </div>

    if (!card) return router.push("/app/cards")

    return (
        <div className="flex flex-col h-full px-3">
            <CardInfoHeader card={card} setCard={setCard} />
            <CardDeleteModel card={card} />
            <div className="content flex flex-col h-full py-3">
                <div className="top flex h-1/2 w-full">
                    <CardUniqueExpenses card={card} />
                </div>
            </div>
        </div>
    )
}

export default Page