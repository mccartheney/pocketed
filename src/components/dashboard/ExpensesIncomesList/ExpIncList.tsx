import cardType from "@/types/cardtype";
import ExpensesIncomesListHeader from "./expIncListHeader";
import { useEffect, useState, useRef } from "react";

const ExpensesIncomesList = ({selectedCard}: {selectedCard: cardType|null}) => {

    const [searchExpInc, setSearchExpInc] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    const resetSearch = () => {
        setSearchExpInc([]);
        if (selectedCard) {
            selectedCard.incomes.forEach((income) => {
                setSearchExpInc((prev) => [...prev, income]);
            });
            selectedCard.expenses.forEach((expense) => {
                setSearchExpInc((prev) => [...prev, expense]);
            });
        }
    }

    const handleSearch = () => {
        if (searchValue === "") {
            resetSearch();
        }
        if (searchValue) {
            setSearchExpInc(searchExpInc.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())));
        }
    }

    useEffect(() => {
        setSearchExpInc([]);
        resetSearch();
    }, [selectedCard]);

    useEffect(() => {
        handleSearch();
    }, [searchValue]);
    

    if (selectedCard === null) {
        return (
            <div className="w-full lg:w-1/2 mt-3 lg:mt-0 lg:mr-3 h-full bg-base-200 rounded-2xl p-3">
            </div>
        )
    }
    
    return (
        <div className="w-full lg:w-1/2 mt-3 lg:mt-0 lg:mr-3 h-full bg-base-200 rounded-2xl p-3">
            <ExpensesIncomesListHeader setSearchValue={setSearchValue}/>
            <ul className="list bg-base-100 rounded-box shadow-md max-h-[300px] overflow-y-auto">
                {searchExpInc.map((item) => (
                    <li className="list-row">
                        <div>
                            <p className="text-sm">{item.name}</p>
                        </div>
                        <div className=""></div>
                        <div className="flex justify-center items-center">
                            <p className="text-sm">{item.value}€</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}   

export default ExpensesIncomesList;