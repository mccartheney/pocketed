import { Line } from "react-chartjs-2"
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

const Graph = ({expensesGraph, } : {expensesGraph : any}) => {
    // define the primary color
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
    // register the chartjs
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

    return (
        <div className="flex flex-col w-full h-full mt-3 p-4 rounded-lg">
            <div className="w-full h-full">
                <Line
                    data={{
                        labels: expensesGraph.labels,
                        datasets: [
                            {
                                data: expensesGraph.data,
                                borderColor: primaryColor,
                                fill: true,
                            },
                        ],
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
                            y: {
                                display: false,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default Graph