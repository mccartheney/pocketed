import { motion } from "framer-motion"
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import  { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import getCards from "@/utils/getCards";
import cardType from "@/types/cardTypes";
import CreateCardModal from "./CreateCardModal";
import CardList from "./ListCard";
import CardHeaderPage from "./CardHeaderPage";
import CardPage from "../cardPage/CardPage";

const Cards = () => {
    const session = useSession()
    const cardNameInput = useRef<any>(null)
    const cardValueInput = useRef<any> (null)
    const [cards, setCards] = useState <cardType[]> ([])
    const [selectedCard, setSelectedCard] = useState <cardType> ()

    useEffect(function getUserCards () {
        getCards({ email: session.data!.user!.email!, setCards: setCards })
    },[])

    if (selectedCard) return <CardPage selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>

    return (
        <div>
            <CardHeaderPage/>
            <CreateCardModal cardNameInput={cardNameInput} cardValueInput={cardValueInput}/>
            <CardList cards={cards} setSelectedCard={setSelectedCard}/>
        </div>
    )
}

export default Cards