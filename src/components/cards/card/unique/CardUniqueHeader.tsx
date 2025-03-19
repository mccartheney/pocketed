import cardType from "@/types/cardtype"
import { Dispatch, SetStateAction } from "react"
import { FaPlus } from "react-icons/fa"

const CardUniqueHeader = (
    { expensesDurations, setExpensesDurations, card }: 
    { expensesDurations: "Week" | "Month", setExpensesDurations: Dispatch<SetStateAction<"Week" | "Month">>, card: cardType }
) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex">
                <h4>
                    {expensesDurations} unique expenses
                </h4>
                <button 
                    onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                    className="btn btn-xs btn-soft ml-3">
                    <FaPlus />
                </button>
            </div>
            <div className="">
                    <button 
                        onClick={() => setExpensesDurations("Week")}
                        className={`btn btn-sm mr-3 ${expensesDurations === "Week" ? "btn-primary" : "btn-soft"}`}>
                        Weekly
                    </button>
                    <button 
                        onClick={() => setExpensesDurations("Month")}
                        className={`btn btn-sm ${expensesDurations === "Month" ? "btn-primary" : "btn-soft"}`}>
                        Monthly
                    </button>
            </div>
        </div>
    )
}

export default CardUniqueHeader