import cardType from "@/types/cardtype";
import FriendsCardGraphHeader from "./FriendsCardGraphHeader";
import { useUser } from "@/context/userContext";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const FriendsCardGraph = ({allCards}: {allCards: cardType[]}) => {

    const { user } = useUser();

    if (allCards.length === 0) {
        return (
            <div className="w-full lg:w-2/4 mt-3 lg:mt-0 lg:mr-3 h-full bg-base-200 rounded-2xl p-3">
            </div>
        )
    }

    return (
        <div className="w-full lg:w-2/4 mt-3 lg:mt-0 lg:mr-3 h-full bg-base-200 rounded-2xl p-3">
            <FriendsCardGraphHeader />
            
            {
                user?.friends.length! === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex flex-col mt-[-20px] justify-center items-center">
                        <h2 className="text-2xl font-bold">No friends yet 😔,</h2>
                        <p className="text-sm">Add friends to see their card quantity</p>
                    </motion.div>
                )
            }

            {
                user?.friends.length! > 0 && (
                    <div className="w-full h-[300px]">
                        <Bar data={
                            {
                                labels: user?.friends.map((friend) => friend.name),
                            datasets: [{
                                label: "Card Quantity",
                                data: user?.friends.map((friend) => friend.cards.length),
                            }]
                        }
                        } options={{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                        beginAtZero: true
                                    }
                                }
                            }} />
                    </div>
                )
            }
            
        </div>
    )
}

export default FriendsCardGraph;