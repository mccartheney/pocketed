import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction, useRef } from "react"
import axios from "axios"
import { useUser } from "@/context/userContext"
import toast from "react-hot-toast"

const CardCreatorModal = (
    { setCards }
    :   
    { setCards: Dispatch<SetStateAction<cardType[]>> }
) => {
    const { user } = useUser()
    const cardNameRef = useRef<HTMLInputElement>(null)
    const cardBalanceRef = useRef<HTMLInputElement>(null)

    const addCard = async () => {
        const cardName = cardNameRef.current?.value
        const cardBalance : number = parseFloat(cardBalanceRef.current?.value || "0")
        cardNameRef.current!.value = ""
        cardBalanceRef.current!.value = ""

        const response = await axios.post("/api/card", {
            email: user?.email,
            cardName,
            cardBalance
        })

        if (response.data.status == 200) {
            setCards(cards =>[...cards, response.data.message])
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-3xl">Create Card</h3>
                <p className="py-4">Please enter the card details:</p>
                <form method="dialog">

                    <div className="form-control">
                        <label className="floating-label">
                            <span>Card Name</span>
                            <input
                                type="text"
                                placeholder="Enter card name"
                                className="input w-full rounded-xl"
                                ref={cardNameRef}
                            />
                        </label>
                    </div>

                    <div className="form-control mt-4">
                        <label className="floating-label">
                            <span>Balance</span>
                            <input 
                                type="number"
                                placeholder="Enter initial balance" 
                                className="input w-full rounded-xl" 
                                ref={cardBalanceRef}
                            />
                        </label>
                    </div>

                    <div className="modal-action">
                        <button className="btn" onClick={() => addCard()}>Add New</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default CardCreatorModal