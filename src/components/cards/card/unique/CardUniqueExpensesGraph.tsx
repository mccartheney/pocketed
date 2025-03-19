"use client"

import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import { expenseType } from "@/types/cardtype"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import daysInThisMonth from "@/utils/reusable_functions/daysInMonth"
import Graph from "./graph"

const CardUniqueExpensesGraph = (
    { expenses, setExpenses, expensesDurations, expensesByDay, }: 
    { expenses: expenseType[] | null, setExpenses: Dispatch<SetStateAction<expenseType[] | null>>, expensesDurations: "Week" | "Month", expensesByDay: {
        Monday : number,
        Tuesday : number,
        Wednesday : number,
        Thursday : number,
        Friday : number,
    } }    
) => {

    const [expensesGraph, setExpensesGraph] = useState<any>({
        labels : [],
        data : []
    })

    useEffect(() => {
        if (!expenses) return

        if (expensesDurations === "Week") {
            setExpensesGraph({
                labels : Object.keys(expensesByDay),
                data : Object.values(expensesByDay)
            })
        }

        if (expensesDurations === "Month") {
            const daysInMonth : number[] = []

            for (let i = 1; i <= daysInThisMonth(); i++) {
                daysInMonth.push(i)
            }

            const expensesByDayArray : number[] = []

            for (let i = 0; i < daysInMonth.length; i++) {
                const allDayExpenses = expenses.filter((expense) => expense.day === daysInMonth[i])
                if (allDayExpenses.length > 0) {
                    const totalExpenses = allDayExpenses.reduce((acc, expense) => acc + expense.value, 0)
                    expensesByDayArray.push(totalExpenses)
                } else {
                    expensesByDayArray.push(0)
                }
            }

            setExpensesGraph({
                labels: Object.keys(daysInMonth),
                data: Object.values(expensesByDayArray)
            })
        }
    },[expensesDurations, expensesByDay])

    
    return <Graph expensesGraph={expensesGraph}/>

}

export default CardUniqueExpensesGraph