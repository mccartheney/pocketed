import economyType from "./economieTypes"
import userType from "./userType"

type cardType = {
    id: number
    name : string
    creator : userType
    owners : userType[]
    expenses : expensesType[]
    balance : number
    economies : economyType[]
    createdAt : Date
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
    id: number
    value : number
    visibleName : string
    name : string
    timeTypeExpense : timeTypeExpense
    month : monthType
    day : number
    dayOfWeek : weekDayType
}

type weekDayType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
type monthType = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"
type timeTypeExpense = "unique" | "mensal"

export type { expenseType, yearExpensesType, expensesType, weekDayType, monthType, timeTypeExpense }
export default cardType;