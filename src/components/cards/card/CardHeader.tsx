"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaEdit, FaTrash } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import cardType from "@/types/cardtype"
import axios from "axios"
import toast from "react-hot-toast"
import { motion } from "framer-motion"  
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

    // method to edit the card name
    const handleEditCardName = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent the default behavior
        e.preventDefault()

        // set the editing to false
        setEditing(false)

        // edit the card name
        const response = await axios.put("/api/card", {
            email : userEmail,
            cardId : card.id,
            newName : cardToRename.current!.value
        })

        // if the card name is edited successfully
        if (response.data.status === 200) {
            // update the card, show the success message and set the editing to false
            setCard(response.data.card)
            toast.success(response.data.message)
            setEditing(false)
        } else {
            // show the error message
            toast.error(response.data.message)
        }
    }

    return (
        <div className="flex flex-col  py-5 px-7 bg-base-200 h-max rounded-2xl">
            <div className="flex justify-between   items-center">

                {
                    !editing ?
                        <motion.h3 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="text-2xl"
                        >
                            {card.name}
                        </motion.h3>
                        : <form onSubmit={(e) => { handleEditCardName(e) }}>
                            <input type="text" defaultValue={card.name} ref={cardToRename} className="outline-none  text-start text-2xl" />
                        </form>
                }


                <div className="">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="btn btn-sm btn-primary"

                        onClick={() => setEditing(true)}
                    >
                        <FaEdit />
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="btn btn-sm btn-primary mx-3"

                        onClick={() => router.push("/app/cards")}
                    >
                        <FaAngleLeft />
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="btn btn-sm btn-error"
                        onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}
                    >
                        <FaTrash />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default CardInfoHeader