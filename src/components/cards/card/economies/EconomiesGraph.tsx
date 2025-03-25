import cardType from "@/types/cardtype";
import { historicType } from "@/types/economieTypes";
import { useEffect } from "react";
import { useState } from "react";
import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full h-full flex flex-col items-center justify-center mt-2">
            <motion.p className="text-center text-2xl font-bold">No money added on this economy</motion.p>
            <motion.p className="text-center text-sm text-primary">Add money to this economy to see the graph, pls 🥺</motion.p>
        </motion.div>
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