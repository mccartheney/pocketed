"use client"
import { useEffect, useState } from "react";
import ExpensesHeader from "./ExpensesHeader";
import cardType, { expensesType, yearExpensesType, expenseType } from "@/types/cardtype";
import axios from "axios";
import { useUser } from "@/context/userContext";
import ExpensesGraph from "./ExpensesGraph";
import ExpensesList from "./ExpensesList";

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
            <div className="flex flex-col w-full h-full pb-3">
                <ExpensesHeader />
                <div className="w-full flex flex-grow mt-3 ">
                    <div className="graph skeleton w-3/4 h-full bg-base-200 rounded-lg">
                        
                    </div>
                    <div className="graph skeleton w-1/4 h-full bg-base-200 ml-3 rounded-lg">
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-full pb-3">
            <ExpensesHeader />
            <div className="w-full flex flex-grow mt-3 ">
                <div className="graph w-3/4 h-full bg-base-200 rounded-lg">
                    {cards.length > 0 && <ExpensesGraph graphData={graphData} />}
                    {cards.length === 0 && <div className="flex flex-col w-full h-full justify-center items-center">
                        <h1 className="text-2xl font-bold">No cards found 😠</h1>
                        <p className="text-sm text-primary">Add a card to see your expenses</p>
                    </div>}
                </div>
                {loadingExpenses ? (
                    <div className="graph skeleton w-1/4 h-full bg-base-200 ml-3 rounded-lg">
                    </div>
                ) : (
                    <div className="graph w-1/4 h-full bg-base-200 ml-3 rounded-lg">
                        <ExpensesList expenses={expenses} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Expenses;