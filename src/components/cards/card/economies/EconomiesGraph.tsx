import cardType from "@/types/cardtype";
import { historicType } from "@/types/economieTypes";
import { useEffect } from "react";
import { useState } from "react";
import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";

const EconomiesGraph = ({history}: {history: historicType[]}) => {
    const [graphData, setGraphData] = useState<{date: number[], value: number[]}>({
        date: [],
        value: []
    });

    useEffect(() => {
        setGraphData({
            date: history.map(historic => historic.value),
            value: history.map(historic => historic.value)
        });
    }, [history]);

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');

    if (graphData.value.length === 0) return (
        <div className="w-full h-full flex flex-col items-center justify-center mt-2">
            <p className="text-center text-2xl font-bold">No money added on this economy</p>
            <p className="text-center text-sm text-primary">Add money to this economy to see the graph, pls 🥺</p>
        </div>
    );

    else {
        return (
            <div className="w-full h-full flex flex-col mt-2">
                <div className="flex-1 w-full max-h-full">
                    <Line
                        data={{
                            labels: graphData.date,
                            datasets: [{
                                label: "Balance",
                                data: graphData.value,
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

}   

export default EconomiesGraph;