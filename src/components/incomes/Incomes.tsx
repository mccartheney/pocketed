"use client"

import { useUser } from "@/context/userContext"
import IncomesHeader from "./IncomesHeader"
import { useEffect, useState } from "react"
import cardType, { expenseType, incomeType } from "@/types/cardtype"
import axios from "axios"
import IncomesGraph from "./IncomesGraph"
import IncomesList from "./IncomesList"
import { motion } from "framer-motion"

type graphData = {
    labels: string[],
    datasets: {
        label: string,
        data: number[]
    }[]
}

const Incomes = () => {
    
    const { user } = useUser()
    const [loading, setLoading] = useState<boolean>(true)
    const [cards, setCards] = useState<cardType[]>([])
    const [incomes, setIncomes] = useState<incomeType[]>([])
    const [loadingIncomes, setLoadingIncomes] = useState<boolean>(true)
    const [graphData, setGraphData] = useState<graphData>({
        labels: [],
        datasets: []
    })


    useEffect(function getAllIncomes() {
        if (cards.length === 0) {
            setLoadingIncomes(false)
            return
        }
        
        const allIncomes : incomeType[] = []

        cards.forEach((card:cardType) => {
            card.incomes.forEach((income:incomeType) => {
                allIncomes.push(income)
            })
        })
        
        setIncomes(allIncomes)
        setLoadingIncomes(false)

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
            const cardIncomesLabel : string[] = []
            const cardIncomesValue : number[] = []

            card.incomes.forEach((income:incomeType) => {
                cardIncomesLabel.push(income.name)
                cardIncomesValue.push(income.value)
            })

            setGraphData(oldGraphData => ({
                ...oldGraphData,
                labels: [...oldGraphData.labels, ...cardIncomesLabel],
                datasets: [...oldGraphData.datasets, {
                    label: card.name,
                    data: cardIncomesValue
                }]
            }))
        })
    },[cards])


    if (loading) {
        return (
            <div className="flex flex-col w-full h-full pb-3 animate-pulse">
                {/* Header Skeleton */}
                <IncomesHeader />

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
            <IncomesHeader />   
            <div className="w-full flex flex-col lg:flex-row flex-grow mt-3 gap-3 ">
                <div className="graph w-full lg:w-3/4 h-[400px] lg:h-full bg-base-200 rounded-lg">
                    {cards.length > 0 && <IncomesGraph graphData={graphData} />}
                    {cards.length === 0 && <motion.div className="flex flex-col w-full h-full justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-2xl font-bold">No cards found 😠</h1>
                        <p className="text-sm text-primary">Add a card to see your Incomes</p>
                    </motion.div>}
                </div>
                <div className="graph w-full lg:w-1/4 h-[200px] lg:h-full bg-base-200 rounded-lg">
                    <IncomesList incomes={incomes} />
                </div>
                
            </div>
        </div>
    )
}

export default Incomes;