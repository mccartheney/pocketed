"use client"

import { cardApiType } from "@/types/cardTypes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useRef } from "react";
import toast from "react-hot-toast";

const CreateCardModel = (
    { setCards }: { setCards: Dispatch<SetStateAction<cardApiType[]>> }
) => {
    // get user email
    const session = useSession ()
    const userEmail = session.data?.user?.email!

    // refs for inputs
    const cardNameInputRef = useRef<HTMLInputElement>(null)
    const cardValueInputRef = useRef<HTMLInputElement>(null)

    const handleCreateCard = () => {
        const cardName = cardNameInputRef.current?.value
        const cardValue = cardValueInputRef.current?.value

        console.log(cardNameInputRef)

        axios.post ("/api/cards", {
            cardName : cardName,
            initialValue : Number(cardValue),
            userEmail : userEmail
        })
            .then (response => {
                if (response.data.status === 200) {
                    toast.success (response.data.message)
                    axios.get("/api/cards", {params : {email : userEmail}})
                        .then(responseCards => setCards(responseCards.data.message))
                }
                else toast.error(response.data.message)
                console.log(response.data)

            })
    }

    return (
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-3xl">Create Card</h3>
                <p className="py-4">Please enter the card details:</p>
                <form method="dialog">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Card Name</span>
                        </label>
                        <input
                            ref={cardNameInputRef}
                            type="text"
                            placeholder="Enter card name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Initial Value</span>
                        </label>
                        <input
                            ref={cardValueInputRef}
                            type="number"
                            placeholder="Enter initial value"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="modal-action">
                        <button className="btn" onClick={handleCreateCard}>Add New</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default CreateCardModel