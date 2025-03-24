import economyType from "./economieTypes"
import userType from "./userType"

type cardType = {
    id: number
    name : string
    creator : userType
    owners : userType[]
    expenses : expenseType[]
    balance : number
    economies : economyType[]
    createdAt : Date
    incomes : incomeType[]
}

type incomeType = {
    id : number,
    card : number,
    name : string,
    value : number,
    date : Date
}

type expensesType = {
    id : number,
    card : cardType,
    yearExpenses : yearExpensesType[]
}

type yearExpensesType = {
    id : number,
    year : number,
    AllExpenses : expenseType[]
}

type expenseType = {
    name: string;
    value: number;
    visibleName: string;
    timeTypeExpense: string;
    month: string;
    day: number;
    dayOfWeek: string;
    year: number;
    cardId: number;
}

type weekDayType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
type monthType = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"
type timeTypeExpense = "unique" | "mensal"

export type { expenseType, yearExpensesType, expensesType, weekDayType, monthType, timeTypeExpense, incomeType }
export default cardType;