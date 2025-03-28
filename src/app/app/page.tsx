"use client"

import AllCards from "@/components/dashboard/allCards/allCards"
import ExpensesIncomesGraph from "@/components/dashboard/expensesIncomesGraph/expIncGraph"
import ExpensesIncomesList from "@/components/dashboard/ExpensesIncomesList/ExpIncList"
import FriendsCardGraph from "@/components/dashboard/friendsCardGraph/friendsCardGraph"
import FriendsList from "@/components/dashboard/friendsList/friendsList"
import cardType from "@/types/cardtype"
import { useEffect, useState } from "react"
import { useUser } from "@/context/userContext"
import axios from "axios"
import Link from "next/link"

const Page = () => {
    const { user } = useUser();
    const [allCards, setAllCards] = useState<cardType[]>([]);
    const [selectedCard, setSelectedCard] = useState<cardType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCards = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get("/api/card", {
                    params: { email: user?.email }
                });

                setAllCards(response.data.message);

                if (response.data.message.length > 0) {
                    setSelectedCard(response.data.message[0]);
                }
            } catch (err) {
                setError("Failed to load cards. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        if (user?.email) {
            getCards();
        }
    }, [user?.email]);

    if (error) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                    <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full flex flex-col p-3 gap-3">
                {/* Top row skeleton */}
                <div className="flex-1 flex flex-col lg:flex-row gap-3">
                    {/* AllCards skeleton */}
                    <div className="lg:w-1/4 bg-base-200 rounded-2xl p-4 animate-pulse">
                        <div className="h-8 bg-base-300 rounded mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-16 bg-base-300 rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Graph skeleton */}
                    <div className="lg:w-3/4 bg-base-200 rounded-2xl p-4 animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-1/3 mb-6"></div>
                        <div className="h-64 bg-base-300 rounded"></div>
                    </div>
                </div>

                {/* Bottom row skeleton */}
                <div className="flex-1 flex flex-col lg:flex-row gap-3">
                    {/* List skeleton */}
                    <div className="lg:w-1/2 bg-base-200 rounded-2xl p-4 animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-1/3 mb-6"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-12 bg-base-300 rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Friends list skeleton */}
                    <div className="lg:w-1/2 bg-base-200 rounded-2xl p-4 animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-1/3 mb-6"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-base-300 rounded-full"></div>
                                    <div className="h-4 bg-base-300 rounded flex-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (allCards.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">No cards found</h2>
                    <p className="text-base-content">You don't have any cards yet. Add one to get started!</p>
                    <Link href="/app/cards">
                        <button className="btn btn-primary mt-4">
                            Go to cards page
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-3 gap-3">
            <div className="flex-1 flex flex-col lg:flex-row gap-3">
                <AllCards
                    allCards={allCards}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                />
                <ExpensesIncomesGraph selectedCard={selectedCard} />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-3">
                <ExpensesIncomesList selectedCard={selectedCard} />
                <FriendsList allCards={allCards} />
            </div>
        </div>
    );
}

export default Page;