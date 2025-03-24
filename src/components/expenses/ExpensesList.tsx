import { expenseType } from "@/types/cardtype";
import cardType from "@/types/cardtype";
import { useRef, useState, useEffect } from "react";

const ExpensesList = ({expenses} : {expenses:expenseType[]}) => {

    const [searchExpenses, setSearchExpenses] = useState<expenseType[]>(expenses)

    const expenseSearch = useRef<HTMLInputElement>(null)

    const handleSearch = () => {
        if (expenseSearch.current) {
            if (expenseSearch.current.value === "") {
                setSearchExpenses(expenses)
            } else {
                setSearchExpenses(expenses.filter(expense => expense.name.toLowerCase().includes(expenseSearch!.current!.value.toLowerCase())))
            }
        }
    }   

    useEffect(function initializeSearch() {
        setSearchExpenses(expenses) 
    }, [expenses])



    return (
        <div className="flex flex-col w-full h-full p-3">
            <h1 className="text-xl font-bold">Expenses List</h1>
            <label className="floating-label my-3">
                <span>Expense Name</span>
                <input type="text" placeholder="Shopping" className="input input-md" onChange={() => handleSearch()} ref={expenseSearch}/>
            </label>

            <div className="divider my-0"></div>

            <ul className="list mt-3 bg-base-100 rounded-box shadow-md overflow-y-auto h-[600px]">

                {searchExpenses.map((expense : expenseType) => (
                    <li className="list-row">
                        <div>
                            <div>{expense.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{expense.day}/{expense.month}/{expense.year}</div>
                        </div>
                        <button className="btn btn-square btn-ghost opacity-0 disabled"></button>
                        <p>
                            {expense.value} €
                        </p>
                    </li>
                ))}

                {searchExpenses.length === 0 && <div className="flex flex-col w-full h-full justify-center items-center">
                    <h1 className="text-2xl font-bold">No expenses found 😠</h1>
                    <p className="text-sm text-primary">Add an expense to see it here</p>
                </div>}

            </ul>

        </div>
    )
}   

export default ExpensesList;