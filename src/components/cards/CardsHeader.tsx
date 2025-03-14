"use client"
import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction } from "react"
import { FaPlus } from "react-icons/fa"

const CardsHeader = (

) => {
    
    return (
        <div className="cardHeader w-full bg-base-200 rounded-2xl p-3 h-20 ">
            <div className="cardHeader_title mt-3 relative">
                <div className="flex w-full justify-between">
                    <h2 className="text-2xl font-bold">
                        Cards
                    </h2>

                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardsHeader