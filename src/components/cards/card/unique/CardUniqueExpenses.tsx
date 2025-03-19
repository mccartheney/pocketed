import cardType, { expenseType } from "@/types/cardtype"
import CardUniqueHeader from "./CardUniqueHeader"
import { useEffect, useState } from "react"
import CardUniqueExpensesGraph from "./CardUniqueExpensesGraph"
import CreateUniqueExpensesModal from "./CreateUniqueExpensesModal"
import axios from "axios"   
import weekDays from "@/constants/weekDays"
import monthsName from "@/constants/months"
const CardUniqueExpenses = (
    { card }: { card: cardType}        
) => {
    const [expensesDurations, setExpensesDurations] = useState<"Week" | "Month">("Week")
    const [expenses, setExpenses] = useState<expenseType[] | null>([])
    const [loading, setLoading] = useState(true)
    const [expensesByDay, setExpensesByDay] = useState<any>(null)

    const getExpenses = async () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = monthsName[date.getMonth()]

        const actualDay = date.getDate()
        const actualWeek = Math.ceil(actualDay / 7)

        const responseMonth = await axios.get(`/api/expenses`, {
            params : {
                cardId : card.id,
                year : year,
                month : month,
            }
        })

        const responseWeek = await axios.get(`/api/expenses`, {
            params : {
                cardId : card.id,
                year : year,
                month : month,
                weekNumber : actualWeek,
            }
        })

        setExpenses(responseMonth.data.message)
        setExpensesByDay(responseWeek.data.byDay)
        setLoading(false)   
    }

    useEffect(function getAllMonthUniqueExpenses() {
        getExpenses()
    }, [])

    if (loading) {
        return (
            <div className="md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col">
                <CardUniqueHeader expensesDurations={expensesDurations} setExpensesDurations={setExpensesDurations} card={card} />
                <div className="skeleton h-full w-full mt-3"></div>
            </div>
        )
    }

    if (!expenses) {
        return (
            <div className="md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col">
                <CardUniqueHeader expensesDurations={expensesDurations} setExpensesDurations={setExpensesDurations} card={card} />
                <div className="skeleton h-full w-full mt-3"></div>
            </div>
        )
    }
    
    return (
        <div className="md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col">
            <CardUniqueHeader expensesDurations={expensesDurations} setExpensesDurations={setExpensesDurations} card={card} />
            <CardUniqueExpensesGraph expenses={expenses} setExpenses={setExpenses} expensesDurations={expensesDurations} expensesByDay={expensesByDay} />
            <CreateUniqueExpensesModal card={card} setExpensesByDay={setExpensesByDay} />
        </div>
    )
}

export default CardUniqueExpenses