"use client"

import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import { expenseType } from "@/types/cardtype"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const CardUniqueExpensesGraph = (
    { expenses, setExpenses, expensesDurations, expensesByDay    }: 
    { expenses: expenseType[] | null, setExpenses: Dispatch<SetStateAction<expenseType[] | null>>, expensesDurations: "Week" | "Month", expensesByDay: {
        Monday : number,
        Tuesday : number,
        Wednesday : number,
        Thursday : number,
        Friday : number,
    } }    
) => {
    const date = new Date()

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
    },[expensesDurations])

    return (
        <div className="flex flex-col h-full w-full mt-3">
            <h1>Card Unique Expenses Graph</h1>
        </div>
    )
}

export default CardUniqueExpensesGraph