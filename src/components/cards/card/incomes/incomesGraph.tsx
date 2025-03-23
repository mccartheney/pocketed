import { incomeType } from "@/types/cardtype";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const IncomesGraph = ({incomes} : {incomes: incomeType[]}) => {
    type incomesGraphType = {
        label : string[],
        value : number[]
    }

    const [incomesGraph, setIncomesGraph] = useState<incomesGraphType>({
        label : [],
        value : []
    });

    useEffect(function organizeIncomes() {
        const incomesToGraph: incomesGraphType = {
            label : [],
            value : []
        }

        incomes.forEach((income : incomeType) => {
            incomesToGraph.label.push(income.name)
            incomesToGraph.value.push(income.value)
        })

        setIncomesGraph(incomesToGraph)
    }, [incomes]);

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 w-full max-h-full">
                <Line
                    data={{
                        labels: incomesGraph.label,
                        datasets: [{
                            label: "Incomes",
                            data: incomesGraph.value,
                            borderColor: primaryColor,
                            
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            x: {
                                display: false,
                            },
                        },
                    }}
                />
            </div>
        </div>

    )
}   

export default IncomesGraph;