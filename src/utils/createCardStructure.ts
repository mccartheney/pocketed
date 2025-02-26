// import month and weeks pointers
import months from "@/constants/months"
import WeekDays from "@/constants/weekDays"
import {cardType, mensalExpensesType, monthExpensesType, weekExpensesType, weekNameExpensesType } from "@/types/expensesType"

// get Dates
const date = new Date()

const year : number = date.getFullYear()

// get the number of weeks on a month
const weekPerMonth : number [] = []
for (let i = 0; i < 5; i++) weekPerMonth.push(i)

// create a empty card
const cardExtruture: cardType = {}

// create a empty week expenses
const weekExpensesNameExtruture : weekNameExpensesType = {}
const weekExpenses : weekExpensesType = {}

WeekDays.forEach ((dayOfWeek : string) => {
    weekExpenses[dayOfWeek] = []
})

weekPerMonth.forEach((week:number) => {
    const weekName = `week${week+1}`
    weekExpensesNameExtruture[weekName] = {}
    weekExpensesNameExtruture[weekName] = weekExpenses    
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
            unique: weekExpensesNameExtruture
        }
    }

    // append that month expense structure to the correspoding year
    cardExtruture[year] = { ...cardExtruture[year], ...monthExpensesExtruture}
}

const getCardStructure = () : cardType => {
    return cardExtruture
}

export default getCardStructure