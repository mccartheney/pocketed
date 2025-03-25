"use client"

import monthsName from "@/constants/months"
import weekDays from "@/constants/weekDays"
import { expenseType } from "@/types/cardtype"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import daysInThisMonth from "@/utils/reusable_functions/daysInMonth"
import Graph from "./graph"
import { motion } from "framer-motion"

const CardUniqueExpensesGraph = (
    { expenses, setExpenses, expensesDurations, expensesByDay, }: 
    { expenses: expenseType[], setExpenses: Dispatch<SetStateAction<expenseType[]>>, expensesDurations: "Week" | "Month", expensesByDay: {
        Monday : number,
        Tuesday : number,
        Wednesday : number,
        Thursday : number,
        Friday : number,
        Saturday : number,
        Sunday : number
    } }    
) => {
    // define state
    const [expensesGraph, setExpensesGraph] = useState<any>({
        labels : [],
        data : []
    })

    // define the days in month
    const daysInMonth: number[] = []
    for (let i = 1; i <= daysInThisMonth(); i++) daysInMonth.push(i)

    useEffect(function setExpensesGraphData() {
        // if the expenses or expensesByDay are not found, return nothing
        if (!expenses || !expensesByDay) return

        // if the expenses duration is week, set the expenses graph for week
        if (expensesDurations === "Week") setExpensesGraph({
                labels : Object.keys(expensesByDay),
                data : Object.values(expensesByDay)
            })

        // if the expenses duration is month, set the expenses graph for month
        if (expensesDurations === "Month") {
            // define the expenses by day array
            const expensesByDayArray : number[] = []

            // set the expenses by day array
                // loop through the days in month
            for (let i = 0; i < daysInMonth.length; i++) {
                // get all expenses on this day
                const allDayExpenses = expenses.filter((expense) => expense.day === daysInMonth[i])

                // if there are no expenses on this day, set expenses value to 0
                if (allDayExpenses.length > 0) {
                    // sum all expenses on this day
                    const totalExpenses = allDayExpenses.reduce((acc, expense) => acc + expense.value, 0)

                    // push the total expenses to the expenses by day array
                    expensesByDayArray.push(totalExpenses)
                } else {
                    // push 0 to the expenses by day array
                    expensesByDayArray.push(0)
                }
            }

            // update graph data
            setExpensesGraph({
                labels: Object.keys(daysInMonth),
                data: Object.values(expensesByDayArray)
            })
        }
    },[expensesDurations, expensesByDay])

    // method to get the week days
    const getWeekDayDate = (weekDay: string) => {
        // define the today date
        const today = new Date();

        // define the current day
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...

        // define the week day index
        const weekDayIndex = weekDays.indexOf(weekDay);
        
        const adjustedWeekDayIndex = weekDayIndex === 0 ? 1 : weekDayIndex + 1;
        const diff = adjustedWeekDayIndex - currentDay;
        
        const date = new Date(today);
        date.setDate(today.getDate() + diff);
        
        // return the week days 
        return date.getDate();
    };

    const openExpensesModal = (day: number) => {
        window.dispatchEvent(new CustomEvent("openExpensesModal", {
            detail: { day }
        }));
        (document.getElementById('my_modal_6') as HTMLDialogElement)?.showModal()
    }

    return (
        <div className="w-full h-[80%]">
            <Graph expensesGraph={expensesGraph}/>
            <div className="w-full overflow-x-auto flex items-center justify-between">
                {expensesDurations === "Week" ? (
                    weekDays.map((day) => (
                        <motion.button
                            key={day}
                            className="btn btn-xs"
                            onClick={() => openExpensesModal(getWeekDayDate(day))}
                            initial={{ rotate: 10 }}
                            animate={{ rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 10
                            }}
                        >
                            {day}
                        </motion.button>

                    ))
                ) : (
                    daysInMonth.map((day) => (
                        <motion.button 
                            key={day}
                            className="btn btn-xs"
                            onClick={() => openExpensesModal(day)}
                            initial={{ rotate: 10 }}
                            animate={{ rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 10
                            }}
                        > 
                            {day} 
                        </motion.button>
                    ))
                )}
            </div>
        </div>
    )

}

export default CardUniqueExpensesGraph