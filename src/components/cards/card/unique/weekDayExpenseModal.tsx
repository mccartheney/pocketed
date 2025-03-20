"use client"

import { expenseType } from "@/types/cardtype"
import axios from "axios"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { TbTrash } from "react-icons/tb"
import { toast } from "react-hot-toast"
const WeekDayExpenseModal = ({ expenses, setExpenses, reloadExpenses }: { expenses: expenseType[], setExpenses: Dispatch<SetStateAction<expenseType[]>>, reloadExpenses: () => void   }) => {

    // define the states
    const [expensesDay, setExpensesDay] = useState<expenseType[]>([])
    const [day, setDay] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({})

    useEffect(function getExpenseDayEvent() {
        // get the expense day event
        window.addEventListener ("openExpensesModal", (event: CustomEvent) => {
            // start loading
            setLoading(true)

            // get the expenses day
            const expensesDay = expenses.filter((expense) => {
                return expense.day === event.detail.day
            })

            // update expenses, day and end loading
            setExpensesDay(expensesDay)
            setDay(event.detail.day)
            setLoading(false)
        })
    }, [expenses])

    // method to delete the expense
    const handleDeleteExpense = async (expense: expenseType) => {
        // start loading for this specific expense
        setLoadingDelete(prev => ({ ...prev, [expense.name]: true }))

        // get the expense name and card id
        const expenseName = expense.name
        const expenseCardId = expense.cardId

        // delete the expense
        const response = await axios.delete('/api/expenses', {
            data: {
                expenseName,
                expenseCardId
            }
        })

        // if the expense is deleted successfully
        if (response.status === 200) {
            // show the success message
            toast.success(response.data.message)

            // update the expenses day and reload the expenses
            setExpensesDay(oldExpenses => oldExpenses.filter(expense => expense.name !== expenseName))
            reloadExpenses()
        } else {
            // show the error message
            toast.error(response.data.message)
        }

        // end loading for this specific expense
        setLoadingDelete(prev => ({ ...prev, [expense.name]: false }))
    }   

    // return the week day expense modal
    return (
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
            {loading && <div className="skeleton h-full w-full"></div>}
            {loading || 
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Expenses of day {day}</h3>
                    <div className="flex flex-col w-full mt-3">
                        <ul className="list bg-base-200 p-1 w-full rounded-box shadow-md max-h-[500px] overflow-y-auto">
                            {
                                expensesDay.length === 0 ? <li className="flex justify-between items-center p-3 border-b border-base-200">
                                    <p>Theres no expenses on this day</p>
                                </li> : null 
                            }
                            {expensesDay.map((expense: expenseType) => (
                                <li key={expense.name} className="flex justify-between items-center p-3 border-b border-base-200">
                                    <div>
                                        <span className="menu-title">{expense.name}</span>
                                        <span className="text-xs uppercase font-semibold opacity-60 block">
                                            {expense.day}/{expense.month}/{expense.year}
                                        </span>
                                    </div>
                                    <p className="text-right text-lg font-bold">{expense.value} €</p>
                                    <button className="btn btn-sm btn-error btn-outline" onClick={() => handleDeleteExpense(expense)}>
                                        {loadingDelete[expense.name] ? <span className="loading loading-spinner loading-xs"></span> : <TbTrash />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            }
        </dialog>
    )
}

export default WeekDayExpenseModal