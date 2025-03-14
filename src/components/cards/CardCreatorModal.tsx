import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction } from "react"

const CardCreatorModal = (
    { setCards }
    :   
    { setCards: Dispatch<SetStateAction<cardType[]>> }
) => {
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
                            />
                        </label>
                    </div>

                    <div className="modal-action">
                        <button className="btn" >Add New</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default CardCreatorModal