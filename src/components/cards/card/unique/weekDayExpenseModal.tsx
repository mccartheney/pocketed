"use client"

import { expenseType } from "@/types/cardtype"
import axios from "axios"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { TbTrash } from "react-icons/tb"
import { toast } from "react-hot-toast"
const WeekDayExpenseModal = ({ expenses, setExpenses, reloadExpenses }: { expenses: expenseType[], setExpenses: Dispatch<SetStateAction<expenseType[] | null>>, reloadExpenses: () => void   }) => {

    const [expensesDay, setExpensesDay] = useState<expenseType[]>([])
    const [day, setDay] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    useEffect(function getExpenseDayEvent() {
        window.addEventListener ("openExpensesModal", (event: CustomEvent) => {
            setLoading(true)
            console.log(event.detail)
            const expensesDay = expenses.filter((expense) => {
                return expense.day === event.detail.day
            })
            setExpensesDay(expensesDay)
            setDay(event.detail.day)
            setLoading(false)
        })
    }, [expenses])

    const handleDeleteExpense = async (expense: expenseType) => {
        setLoadingDelete(true)
        const expenseName = expense.name
        const expenseCardId = expense.cardId

        const response = await axios.delete('/api/expenses', {
            data: {
                expenseName,
                expenseCardId
            }
        })

        if (response.status === 200) {
            toast.success(response.data.message)
            setExpensesDay(oldExpenses => oldExpenses.filter(expense => expense.name !== expenseName))
            reloadExpenses()
        }else {
            toast.error(response.data.message)
        }
        setLoadingDelete(false)
    }   


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
                                        {loadingDelete ? <span className="loading loading-spinner loading-xs"></span> : <TbTrash />}
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