"use client"

import { useSession } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import cardType from "@/types/cardtype"

const CardDeleteModel = (
    { card }: { card: cardType }
) => {
    // get user email
    const session = useSession()
    const emailUser = session.data?.user?.email

    // router ro redirect
    const router = useRouter()

    // method to delete the card
    const handleCardDelete = () => {

        // delete the card
        axios.delete("/api/card", {
            data: {
                cardId: card.id,
                email : emailUser
            }
        }).then(response => {
            // if the card is deleted successfully
            if (response.data.status === 200) {
                // show the success message and redirect to the cards page
                toast.success(response.data.message)
                router.push("/app/cards")
            } else {
                // show the error message
                toast.error(response.data.message)
            }
        })
    }

    return (
        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete card</h3>
                <p className="py-4">Are you sure that you want to delete the card {card.name} 🤨</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-error mx-3" onClick={() => handleCardDelete()}>delete</button>
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CardDeleteModel