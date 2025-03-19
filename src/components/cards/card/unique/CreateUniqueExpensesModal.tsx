"use client"
import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import cardType, { expenseType } from "@/types/cardtype"
import axios from "axios"
import { Dispatch, SetStateAction, useRef } from "react"
import { toast } from "react-hot-toast"

const CreateUniqueExpensesModal = ({card, setExpensesByDay} : {card : cardType, setExpensesByDay : Dispatch<SetStateAction<any>>}) => {   
    const expenseNameRef = useRef<HTMLInputElement>(null)
    const expenseAmountRef = useRef<HTMLInputElement>(null)
    const expenseDateTypeRef = useRef<HTMLSelectElement>(null)

    const handleCreateUniqueExpenses = async () => {
        const expenseName = expenseNameRef.current?.value
        const expenseAmount : number = Number(expenseAmountRef.current?.value!)
        const expenseDateType = expenseDateTypeRef.current?.value

        if (!expenseName || !expenseAmount || !expenseDateType) {
            toast.error("Please fill in all fields")   
            return
        }

        const date = new Date()

        const newExpense : expenseType = {
            value : expenseAmount,
            visibleName : expenseName,
            name : expenseName,
            timeTypeExpense : "unique",
            month : monthsName[date.getMonth()],
            day : date.getDate(),
            dayOfWeek : weekDays[date.getDay()],
            year : date.getFullYear(),
            cardId : card.id
        }

        const response = await axios.post("/api/expenses", newExpense)

        expenseAmountRef.current!.value = ""
        expenseNameRef.current!.value = ""

        if (response.status === 200) {
            toast.success("Expense created successfully")
            const date = new Date()
            const year = date.getFullYear()
            const month = monthsName[date.getMonth()]

            const actualDay = date.getDate()
            const actualWeek = Math.ceil(actualDay / 7)


            const responseWeek = await axios.get(`/api/expenses`, {
                params: {
                    cardId: card.id,
                    year: year,
                    month: month,
                    weekNumber: actualWeek,
                }
            })

            setExpensesByDay(responseWeek.data.byDay)
        } else {
            toast.error("Error creating expense")
        }
    }

 


    return (
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create new unique expenses</h3>
                <p className="pt-4 pb-1">Fill in the form below to create a new unique expenses</p>
                <div className="divider my-1"></div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input type="text" className="input" placeholder="Shopping" required ref={expenseNameRef}/>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Value</legend>
                    <input type="number" className="input" placeholder="10" required ref={expenseAmountRef}/>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Date type</legend>
                    <select defaultValue="Weekly" className="select" ref={expenseDateTypeRef}>
                        <option>Weekly</option>
                        <option>Montly</option>
                    </select>
                </fieldset>


                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-success mr-3" onClick={handleCreateUniqueExpenses}>Create</button>
                        <button className="btn btn-error">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CreateUniqueExpensesModal
