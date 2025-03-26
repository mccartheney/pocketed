import cardType from "@/types/cardtype";
import ExpensesIncomesGraphHeader from "./expIncGraphHeader";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ExpensesIncomesGraph = ({selectedCard}: {selectedCard: cardType|null}) => {

    const [expensesIncomesGraph, setExpensesIncomesGraph] = useState<any>({});
    const [labels, setLabels] = useState<number[]>([]);


    useEffect(() => {
        if (selectedCard) {
            const expenses = selectedCard.expenses.map((expense) => expense.value);
            const incomes = selectedCard.incomes.map((income) => income.value);
            setExpensesIncomesGraph({
                expenses: expenses,
                incomes: incomes
            })
            if (expenses.length > incomes.length) {
                setLabels(expenses.map((expense, index) => index + 1));
            } else {
                setLabels(incomes.map((income, index) => index + 1));
            }
        }
    },[selectedCard])

    if (selectedCard === null) {
        return (
            <div className="w-full lg:w-3/4 mt-3 lg:mt-0 lg:ml-3 h-full bg-base-200 rounded-2xl p-3">
            </div>
        )
    }

    const primaryColor = document.documentElement.style.getPropertyValue('--color-primary');
    const secondaryColor = document.documentElement.style.getPropertyValue('--color-secondary');

    return (
        <div className="w-full lg:w-3/4 mt-3 lg:mt-0 lg:ml-3 h-full bg-base-200 rounded-2xl p-3">
            <ExpensesIncomesGraphHeader />
            <div className="w-full h-[300px]">
                <Line data={{
                    labels: [...labels],
                    datasets: [{
                        label: "Expenses",
                        data: expensesIncomesGraph.expenses,
                        borderColor: primaryColor,
                        backgroundColor: primaryColor,
                        fill: true,
                        tension: 0.4
                    },{
                        label: "Incomes",
                        data: expensesIncomesGraph.incomes,
                        borderColor: secondaryColor,
                        backgroundColor: secondaryColor,
                        fill: true,
                        tension: 0.4
                    }],
                }}
                options={{
                    responsive: true,   
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                        }
                    }}
                    />
            </div>
        </div>
    )
}

export default ExpensesIncomesGraph;