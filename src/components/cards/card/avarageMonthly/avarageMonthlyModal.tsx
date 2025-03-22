import cardType, { expenseType } from "@/types/cardtype"
import { Dispatch, SetStateAction } from "react"
import HandleExpenses from "@/utils/handles/handleExpenses"
import axios from "axios"
import toast from "react-hot-toast"
import { TbTrash } from "react-icons/tb"
const AvarageMonthlyModal = (
    { expenses, setExpenses, card }: { expenses: expenseType[], setExpenses: Dispatch<SetStateAction<expenseType[]>>, card: cardType }
) => {

    const handleDeleteExpense = async(expense: expenseType) => {
        const response = await axios.delete("/api/expenses", {
            data: {
                expenseName: expense.name,
                expenseCardId: card.id
            }
        })

        if (response.status === 200) {
            setExpenses(response.data.updatedExpenses)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <dialog id="my_modal_8" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Mensal expenses</h3>
                <p className="py-4">Your mensal expenses</p>
                <ul className="list bg-base-200 p-1 w-full rounded-box shadow-md max-h-[500px] overflow-y-auto">
                    {
                        expenses.filter((expense: expenseType) => expense.timeTypeExpense === "mensal").map((expense: expenseType) => (
                            <li key={expense.name} className="flex justify-between items-center p-3 border-b border-base-200">
                                <div>
                                    <span className="menu-title">{expense.name}</span>
                                    <span className="text-xs uppercase font-semibold opacity-60 block">
                                        {expense.day}/{expense.month}/{expense.year}
                                    </span>
                                </div>
                                <p className="text-right text-lg font-bold">{expense.value} €</p>
                                <button className="btn btn-sm btn-error btn-outline" onClick={() => handleDeleteExpense(expense)}>
                                    <TbTrash />
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <p className="mt-3 text-md font-bold">
                    This month you spent {expenses.reduce((acc, expense) => acc + expense.value, 0)} €
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AvarageMonthlyModal