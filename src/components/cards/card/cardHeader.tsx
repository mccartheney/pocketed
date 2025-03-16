"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaEdit, FaTrash } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import cardType from "@/types/cardtype"
import axios from "axios"
import toast from "react-hot-toast"

const CardInfoHeader = (
    { card, setCard }: { card: cardType, setCard: Dispatch<SetStateAction<cardType | undefined>> }
) => {
    // get email
    const session = useSession()
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


    const handleEditCardName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditing(false)

        const response = await axios.put("/api/card", {
            email : userEmail,
            cardId : card.id,
            newName : cardToRename.current!.value
        })

        if (response.data.status === 200) {
            setCard(response.data.card)
            toast.success(response.data.message)
            setEditing(false)
        }else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className="flex flex-col  py-5 px-7 bg-base-200 h-max rounded-2xl">
            <div className="flex justify-between   items-center">

                {
                    !editing ?
                        <h3 className="text-2xl">
                            {card.name}
                        </h3>
                        : <form onSubmit={(e) => { handleEditCardName(e) }}>
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
                        onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardInfoHeader