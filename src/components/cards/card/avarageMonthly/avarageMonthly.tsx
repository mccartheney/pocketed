import cardType, { expenseType } from "@/types/cardtype"
import { Doughnut } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import AvarageMonthlyHeader from "./avarageMonthlyHeader"
import AvarageMonthlyNewExpenseModal from "./avarageMonthlyNewExpenseModal"
import AvarageMonthlyModal from "./avarageMonthlyModal"
Chart.register(...registerables)

const AvarageMonthly = (
    { card, expenses, setExpenses, loading }: { card: cardType, expenses: expenseType[], setExpenses: Dispatch<SetStateAction<expenseType[]>>, loading: boolean }
) => {

    // define state
    const [graphData, setGraphData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] })
    const [loadingInternal, setLoadingInternal] = useState<boolean>(true)

    useEffect(function getAvarageMonthlyExpenses() {

        // get the mensal and unique expenses
        const mensalExpenses: expenseType[] = expenses.filter((expense: expenseType) => expense.timeTypeExpense === "mensal")

        // get the labels and data
        const labels: string[] = []
        mensalExpenses.forEach((expense: expenseType) => {
            labels.push(expense.visibleName)
        })

        const data: number[] = []
        mensalExpenses.forEach((expense: expenseType) => {
            data.push(expense.value)
        })

        // set the graph data
        setGraphData({ labels, data })
        setLoadingInternal(false)
    }, [expenses])

    // Function to generate random colors
    const randomColors = (num: number) =>
        Array.from({ length: num }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
    
    if (loadingInternal || loading) {
        return (
            <div className="md:w-1/5 w-full h-full bg-base-200 rounded-2xl p-3 md:ml-3 flex flex-col">
                <AvarageMonthlyHeader />
                <div className="skeleton w-full h-full mt-2"></div>
            </div>
        )
    }


    return (
        <div className="md:w-1/5 w-full h-full bg-base-200 rounded-2xl p-3 md:ml-3 flex flex-col">
            <AvarageMonthlyHeader />
            <AvarageMonthlyModal expenses={expenses} setExpenses={setExpenses} card={card} />
            <AvarageMonthlyNewExpenseModal setExpenses={setExpenses} card={card} />
            {
                graphData.labels.length > 0 && graphData.data.length > 0 && (
                    <div className="relative w-full  h-100 flex justify-center items-center">
                        <Doughnut data={{
                            labels: graphData.labels,
                            datasets: [{
                                data: graphData.data,
                                backgroundColor: randomColors(graphData.labels.length)  
                            }]
                        }} />
                        <div className="absolute top-0 mt-7 left-0 w-full h-full flex justify-center items-center">
                            <p className="text-center text-lg font-bold">
                                {expenses.filter((expense: expenseType) => expense.timeTypeExpense === "mensal").reduce((acc: number, expense: expenseType) => acc + expense.value, 0)} €
                            </p>
                        </div>
                    </div>
                )
            }
            {
                graphData.labels.length === 0 && graphData.data.length === 0 && (
                    <div className="w-full h-100 flex flex-col justify-center items-center">
                        <p className="text-center text-lg font-bold">You did not added any mensal expenses here</p>
                        <p className="text-center text-sm opacity-60">Add it now! 😡</p>
                    </div>
                )
            }
        </div>
    )
}

export default AvarageMonthly
