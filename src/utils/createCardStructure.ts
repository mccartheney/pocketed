// import month and weeks pointers
import months from "@/constants/months"
import WeekDays from "@/constants/weekDays"
import {cardType, mensalExpensesType, monthExpensesType, weekExpensesType } from "@/types/expensesType"

// get Dates
const date = new Date()

const year : number = date.getFullYear()
const month : string = months[date.getMonth()]
const weekDay : string = WeekDays[date.getDay() -1]
const day : number = date.getDate()

// get the number of weeks on a month
const weekPerMonth : number [] = []
for (let i = 0; i < 5; i++) weekPerMonth.push(i)

// create a empty card
let cardExtruture: cardType = {}

// create a empty week expenses
const weekExpenses : weekExpensesType = {}
WeekDays.forEach ((dayOfWeek : string) => {
    weekExpenses[dayOfWeek] = []
})

// create a empty month expenses
const mensalExpenses : mensalExpensesType = []

// create the month expenses estruture
for (let i = 0; i <= date.getMonth(); i++) {
    // get the month index
    const thisIndexMonth = months[i]

    // create a month expense for that month
    const monthExpensesExtruture : monthExpensesType = {
        [thisIndexMonth] : {
            mensal : mensalExpenses,
            unique : weekExpenses
        }
    }

    // append that month expense structure to the correspoding year
    cardExtruture[year] = { ...cardExtruture[year], ...monthExpensesExtruture}
}


const getCardStructure = () : cardType => {
    return cardExtruture
}

export default getCardStructure