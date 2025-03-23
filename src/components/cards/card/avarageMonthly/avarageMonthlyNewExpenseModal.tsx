import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import cardType, { expenseType } from "@/types/cardtype"
import axios from "axios"
import { Dispatch, SetStateAction, useRef } from "react"
import { toast } from "react-hot-toast"

const AvarageMonthlyNewExpenseModal = (
    {card, setExpenses} : {card : cardType, setExpenses : Dispatch<SetStateAction<expenseType[]>>}
) => {

    // define refs
    const expenseNameRef = useRef<HTMLInputElement>(null)
    const expenseValueRef = useRef<HTMLInputElement>(null)


    const handleCreateMensalExpense = async () => {

        // get expense name and value
        const expenseName = expenseNameRef.current?.value
        const expenseValue = Number(expenseValueRef.current?.value)

        // if the expense name and value are not found, show the error message
        if (!expenseName || !expenseValue) {
            toast.error("Please fill in all fields")
            return
        }

        // define the new date
        const date = new Date()

        // create the expense 
        const response = await axios.post("/api/expenses", {
            value: expenseValue ,
            visibleName: expenseName,
            name: expenseName,
            timeTypeExpense: "mensal",
            month: monthsName[date.getMonth()],
            day: date.getDate(),
            dayOfWeek: weekDays[date.getDay() - 1],
            year: date.getFullYear(),
            cardId: card.id
        })

        // reset input values
        expenseNameRef.current!.value = ""
        expenseValueRef.current!.value = ""

        // if the expense is created, show the success message
        if (response.data.status === 200) {
            toast.success("Expense created successfully")
            setExpenses(expenses => [...expenses, response.data.expense])
        }

        // if the expense is not created, show the error message
        if (response.data.status !== 200) {
            toast.error("Error creating expense")
        }

    }

    return (
        <dialog id="my_modal_7" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">create a new mensal expense</h3>
                <p className="py-4">Fill in the form below to create a new mensal expenses</p>

                <div className="divider my-1"></div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input type="text" className="input" placeholder="water" required ref={expenseNameRef}/>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Value</legend>
                    <input type="number" className="input" placeholder="50" required ref={expenseValueRef} />
                </fieldset>


                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-success mr-3" onClick={ () =>handleCreateMensalExpense()}>create</button>
                        <button className="btn btn-error">cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AvarageMonthlyNewExpenseModal