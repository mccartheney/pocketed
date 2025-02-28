"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaEdit, FaTrash } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { cardApiType } from "@/types/cardTypes"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import LoadingPage from "../LoadingPage"
import axios from "axios"

const CardInfoHeader = (
    { card, setCard }: { card: cardApiType, setCard: Dispatch<SetStateAction<cardApiType | undefined>> }
) => {
    // get email
    const session = useSession ()
    const userEmail = session.data?.user?.email

    // states to handle card name edit 
    const [editing, setEditing] = useState<boolean>(false)
    const cardToRename = useRef<HTMLInputElement | null>(null)

    // router to redirect
    const router = useRouter()

    // focus on input
    useEffect(function changeCardNameInputFocus() {
        if (editing) {
            cardToRename.current!.focus()
        }
    }, [editing])

    if (!card) return <LoadingPage/>
    
    const handleEditCardName = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditing(false)

        axios.put ("/api/cards", {
            email : userEmail,
            cardName : card.name, 
            newCardName : cardToRename.current?.value! || ""
        }) .then (response => {
            if (response.data.status == 200) {
                setCard(response.data.message)
                toast.success("Card Renamed")
            }
            else {
                cardToRename.current!.value = card.name
                toast.error(response.data.message)
            }
        })

    }

    return (
        <div className="">
            <div className="flex justify-between mt-3  items-center">

                {
                    !editing ?
                        <h3 className="text-2xl">
                            {card.name}
                        </h3>
                        : <form onSubmit={(e) => {handleEditCardName(e)}}>
                            <input type="text" defaultValue={card.name} ref={cardToRename} className="bg-base-100 outline-none  text-start text-2xl" />
                        </form>
                }


                <div className="">
                    <button
                        className="btn btn-sm btn-primary"

                        onClick={() => setEditing(true)}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="btn btn-sm btn-primary mx-3"

                        onClick={() => router.push("/app/cards")}
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="btn btn-sm btn-error"
                        onClick={() => document.getElementById('my_modal_2').showModal()}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div
                className={`divider`}

            />
        </div>
    )
}

export default CardInfoHeader