"use client"
import { useEffect, useState } from "react";
import ExpensesHeader from "./ExpensesHeader";
import cardType, { expensesType, yearExpensesType, expenseType } from "@/types/cardtype";
import axios from "axios";
import { useUser } from "@/context/userContext";
import ExpensesGraph from "./ExpensesGraph";
import ExpensesList from "./ExpensesList";
import { motion } from "framer-motion";

type graphData = {
    labels: string[],
    datasets: {
        label: string,
        data: number[]
    }[]
}

const Expenses = () => {

    const {user} = useUser()
    const [loading,setLoading] = useState<boolean>(true)
    const [cards,setCards] = useState<cardType[]>([])
    const [expenses,setExpenses] = useState<expenseType[]>([])
    const [loadingExpenses,setLoadingExpenses] = useState<boolean>(true)
    const [graphData,setGraphData] = useState<graphData>({
        labels: [],
        datasets: []
    })

    useEffect(function getAllExpenses() {
       if (cards.length === 0) {
           setLoadingExpenses(false)
           return
       }

        const allExpenses : expenseType[] = []

       cards.forEach((card:cardType) => {
        card.expenses.forEach((expense:expenseType) => {
            allExpenses.push(expense)
        })
       })
       setExpenses(allExpenses)
       setLoadingExpenses(false)
    },[cards])

    useEffect(function getCards() {
        const getAllCards = async () => {
            const response = await axios.get(`/api/card`, {
                params: {
                    email: user?.email
                }
            })
            
            setCards(response.data.message)
            setLoading(false)
        }
        getAllCards()
    }, [])


    useEffect(function getGraphData() {
        if (cards.length === 0) return

        setGraphData({
            labels: [],
            datasets: []
        })

        cards.forEach((card:cardType) => {
            const cardExpensesLabel : string[] = []
            const cardExpensesValue : number[] = []

            card.expenses.forEach((expense:expenseType) => {
                cardExpensesLabel.push(expense.name)
                cardExpensesValue.push(expense.value)
            })

            setGraphData(oldGraphData => ({
                ...oldGraphData,
                labels: [...oldGraphData.labels, ...cardExpensesLabel],
                datasets: [...oldGraphData.datasets, {
                    label: card.name,
                    data: cardExpensesValue
                }]
            }))
        })    
    }, [cards])

    if (loading) {
        return (
            <div className="flex flex-col w-full h-full pb-3 animate-pulse">
                {/* Header Skeleton */}
                <ExpensesHeader />

                {/* Content Skeleton */}
                <div className="w-full flex flex-col lg:flex-row flex-grow gap-3 mt-2">
                    {/* Main Graph Area */}
                    <div className="w-full lg:w-3/4 h-[400px] lg:h-full bg-base-200 rounded-lg p-4">
                        {/* Graph Controls */}
                        <div className="flex justify-center items-center  w-full mb-4">
                            <div className="flex items-center justify-center gap-2">
                                <div className="skeleton h-8 w-20 rounded"></div>
                                <div className="skeleton h-8 w-20 rounded"></div>
                            </div>
                        </div>

                        {/* Graph Placeholder */}
                        <div className="skeleton w-full h-[calc(100%-40px)] rounded"></div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 h-[200px] lg:h-full bg-base-200 rounded-lg p-4">
                        {/* Summary Section */}
                        <div className="skeleton h-6 w-1/3 mb-4 rounded"></div>
                        <div className="skeleton h-8 w-full mb-4 rounded"></div>
                        <div className="divider"></div>
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="skeleton h-10 w-full rounded"></div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-full pb-3">
            <ExpensesHeader />
            <div className="w-full flex flex-col lg:flex-row flex-grow mt-3 gap-3">
                {/* Main Graph Section */}
                <div className="graph w-full lg:w-3/4 h-[400px]  lg:h-full bg-base-200 rounded-lg">
                    {cards.length > 0 && <ExpensesGraph graphData={graphData} />}
                    {cards.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col w-full h-full justify-center items-center">
                            <h1 className="text-2xl font-bold">No cards found 😠</h1>
                            <p className="text-sm text-primary">Add a card to see your expenses</p>
                        </motion.div>
                    )}
                </div>

                {/* Expenses List Section */}
                {loadingExpenses ? (
                    <div className="graph skeleton w-full lg:w-1/4 h-[200px] mt-3 lg:mt-0 lg:h-full bg-base-200 rounded-lg">
                    </div>
                ) : (
                    <div className="graph w-full lg:w-1/4 h-[200px] lg:h-full mt-3 lg:mt-0 bg-base-200 rounded-lg">
                        <ExpensesList expenses={expenses} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Expenses;