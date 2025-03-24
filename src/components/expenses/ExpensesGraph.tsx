import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

type graphData = {
    labels: string[],
    datasets: {
        label: string,
        data: number[]
    }[]
}

const ExpensesGraph = (
    {
        graphData
    } : {
        graphData : graphData
    }
) => {
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

    const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--color-base-100');

    return (
        <div className="w-full h-full bg-base-200 rounded-lg p-4">
            <Line
                data={{
                    labels: graphData.labels,
                    datasets: graphData.datasets.map((dataset, index) => ({
                        ...dataset,
                        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][index % 4],
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"][index % 4] + "50",
                        fill: true,
                    })),
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: gridColor
                            }
                        },
                        x: {
                            display: false,
                            grid: {
                                color: gridColor
                            }
                        },
                    },
                }}
            />
        </div>

    )
}

export default ExpensesGraph