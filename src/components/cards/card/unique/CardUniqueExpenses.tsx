
import cardType, { expenseType } from "@/types/cardtype"
import CardUniqueHeader from "./CardUniqueHeader"
import { useEffect, useState } from "react"
import CardUniqueExpensesGraph from "./CardUniqueExpensesGraph"
import CreateUniqueExpensesModal from "./CreateUniqueExpensesModal"
import axios from "axios"   
import weekDays from "@/constants/weekDays"
import monthsName from "@/constants/months"
import WeekDayExpenseModal from "./weekDayExpenseModal"

const CardUniqueExpenses = (
    { card }: { card: cardType}        
) => {
    // define states
    const [expensesDurations, setExpensesDurations] = useState<"Week" | "Month">("Week")
    const [expenses, setExpenses] = useState<expenseType[]>([])
    const [loading, setLoading] = useState(true)
    const [expensesByDay, setExpensesByDay] = useState<{
        Monday : number,
        Tuesday : number,
        Wednesday : number,
        Thursday : number,
        Friday : number,
        Saturday : number,
        Sunday : number
    }>({
        Monday : 0,
        Tuesday : 0,
        Wednesday : 0,
        Thursday : 0,
        Friday : 0,
        Saturday : 0,
        Sunday : 0
    })

    // method to get the expenses
    const getExpenses = async () => {
        // define the date
        const date = new Date()
        const year = date.getFullYear()
        const month = monthsName[date.getMonth()]

        // define the actual day and week
        const actualDay = date.getDate()
        const actualWeek = Math.ceil(actualDay / 7)

        // get the expenses by month
        const responseMonth = await axios.get(`/api/expenses`, {
            params : {
                cardId : card.id,
                year : year,
                month : month,
            }
        })

        // get the expenses by week
        const responseWeek = await axios.get(`/api/expenses`, {
            params : {
                cardId : card.id,
                year : year,
                month : month,
                weekNumber : actualWeek,
            }
        })

        // set the expenses and end the loading
        setExpenses(responseMonth.data.message)
        setExpensesByDay(responseWeek.data.byDay)
        setLoading(false)   
    }

    // method to reload the expenses
    const reloadExpenses = () => {
        getExpenses()
    }

    // use Effect to get the expenses
    useEffect(function getAllMonthUniqueExpenses() {
        getExpenses()
    }, [])

    // if the loading is true, show the loading page
    if (loading) {
        return (
            <div className="md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col">
                <CardUniqueHeader expensesDurations={expensesDurations} setExpensesDurations={setExpensesDurations} card={card} />
                <div className="skeleton h-full w-full mt-3"></div>
            </div>
        )
    }

    // if the expenses are not found, show the loading page
    if (!expenses) {
        return (
            <div className="md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col">
                <CardUniqueHeader expensesDurations={expensesDurations} setExpensesDurations={setExpensesDurations} card={card} />
                <div className="skeleton h-full w-full mt-3"></div>
            </div>
        )
    }

    // return the card unique expenses
    return (
        <div className="md:w-3/5 w-full h-full bg-base-200 rounded-2xl p-3 flex flex-col">
            <CardUniqueHeader expensesDurations={expensesDurations} setExpensesDurations={setExpensesDurations} card={card}  />
            <CardUniqueExpensesGraph expenses={expenses} setExpenses={setExpenses} expensesDurations={expensesDurations} expensesByDay={expensesByDay} />
            <CreateUniqueExpensesModal card={card} setExpensesByDay={setExpensesByDay} reloadExpenses={reloadExpenses} />
            <WeekDayExpenseModal expenses={expenses} setExpenses={setExpenses} reloadExpenses={reloadExpenses} />
        </div>
    )
}

export default CardUniqueExpenses