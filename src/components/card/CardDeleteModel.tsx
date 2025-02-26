"use client"

import { useSession } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const CardDeleteModel = (
    {cardName} : {cardName:string}
) => {
    // get user email
    const session = useSession()
    const emailUser = session.data?.user?.email

    // router ro redirect
    const router = useRouter()

    
    const handleCardDelete = () => {
        axios.delete ("/api/cards", {
            data: {
                email: emailUser,
                cardName: cardName
            }
        }).then (response => {
            if (response.data.status === 200) {
                toast.success(response.data.message)
                router.push("/app/cards")     
            }
            else toast.error(response.data.message) 
        }
        )
    }

    return (
        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete card</h3>
                <p className="py-4">Are you sure that you want to delete the card {cardName} 🤨</p>
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