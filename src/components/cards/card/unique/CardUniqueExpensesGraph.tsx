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

    const daysInMonth: number[] = []

    for (let i = 1; i <= daysInThisMonth(); i++) {
        daysInMonth.push(i)
    }

    useEffect(() => {
        if (!expenses) return

        if (expensesDurations === "Week") {
            setExpensesGraph({
                labels : Object.keys(expensesByDay),
                data : Object.values(expensesByDay)
            })
        }

        if (expensesDurations === "Month") {


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

    const getWeekDayDate = (weekDay: string) => {
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Domingo, 1 = Segunda, ...
        const weekDayIndex = weekDays.indexOf(weekDay);
        
        // Ajusta o índice para corresponder ao padrão do JavaScript (0 = Domingo)
        const adjustedWeekDayIndex = weekDayIndex === 0 ? 1 : weekDayIndex + 1;
        const diff = adjustedWeekDayIndex - currentDay;
        
        const date = new Date(today);
        date.setDate(today.getDate() + diff);
        
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
                        <button key={day}
                            className="btn btn-xs"
                            onClick={() => openExpensesModal(getWeekDayDate(day))}
                        > 
                            {day} ({getWeekDayDate(day)})
                        </button>
                    ))
                ) : (
                    daysInMonth.map((day) => (
                        <button 
                            key={day}
                            className="btn btn-xs"
                            onClick={() => openExpensesModal(day)}
                        > 
                                {day} 
                        </button>
                    ))
                )}
            </div>
        </div>
    )

}

export default CardUniqueExpensesGraph