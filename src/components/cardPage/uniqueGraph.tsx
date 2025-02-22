"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import cardType from "@/types/cardTypes";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = (
    { card, chartType }: { card: cardType, chartType: "week" | "month" }
) => {

    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    const thisYearExpenses = Object.entries(card.expenses["2025"])
    const sortedYearExpenses = thisYearExpenses.sort((a, b) => months.indexOf(a[0]) - months.indexOf(b[0]))
    let monthExpenses : number[] = []

    
    sortedYearExpenses.forEach(([key, value] : [string, any]) => {
        let thisMonthExpenses : number = 0
        Object.entries(value["mensal"]).forEach(([expenses, price] : [string, any]) => {
            thisMonthExpenses += price
        })

        monthExpenses.push(Number(thisMonthExpenses.toFixed(2)))
    })

    let weekExpenses: number[] = []

    let actualMonth = months[new Date().getMonth()]
    thisYearExpenses.forEach(([key, value]: [string, any]) => {
        
        if (actualMonth == key) {
            const actualDate : number = new Date().getDate()
            let expensesWeek : any[] = []
            if (1 <= actualDate && actualDate <= 7) expensesWeek = value["unique"]["week1"]
            else if (8 <= actualDate && actualDate <= 14) expensesWeek = value["unique"]["week2"]
            else if (15 <= actualDate && actualDate <= 21) expensesWeek = value["unique"]["week3"]
            else if (22 <= actualDate && actualDate <= 28) expensesWeek = value["unique"]["week4"]
            else expensesWeek = value["unique"]["week5"]


            const orderedWeekExpenses = Object.fromEntries (
                days
                    .map (day => {
                        let FullExpenseDay = 0
                        Object.values(expensesWeek[day]).forEach(expense => FullExpenseDay += Number(expense))
                        weekExpenses.push(FullExpenseDay)
                        return [day, expensesWeek[day]]   
                    })
            )
        }
    })


    const data = {
        labels: chartType == "week" ? [...days] : [...months],
        datasets: [
            {
                label: "boughts",
                data: chartType == "week" ? [...weekExpenses] : [...monthExpenses],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { display: false },
                // ticks: { display: false },
                border: { display: false }
            },
            y: {
                grid: { display: false },
                beginAtZero: true,
                ticks: { display: false },
                border: { display: false }
            }
        },
        plugins: {
            legend: { display: false } 
        }
    };

    return <Line data={data} options={options} />;
};

export default MyChart;
