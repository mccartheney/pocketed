import cardType, { expensesType, expenseType, monthType, timeTypeExpense, weekDayType, yearExpensesType } from "@/types/cardtype"
import HandleCard from "./handleCard"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


type expenseInfoType = {
    id: number
    value : number
    visibleName : string
    name : string
    timeTypeExpense : timeTypeExpense
    month : monthType
    day : number
    dayOfWeek : weekDayType
}

class HandleExpenses {
    async getExpenses(
        cardId : number, 
        year : number,
        searchType : "unique" | "mensal" | "all"
    ) {
        const handleCard = new HandleCard()
        const card = await handleCard.getCard(cardId)

        if (!card) return "card dont exist"

        const SelectedYearExpenses = card.expenses.filter((expense) => expense.yearExpenses.filter((yearExpense) => yearExpense.year === year))
        
        if (SelectedYearExpenses.length === 0) return "no expenses in this year"
        
        const yearAllExpenses = SelectedYearExpenses[0].yearExpenses[0].AllExpenses
        const searchTypeExpenses = yearAllExpenses.filter((expense) => expense.timeTypeExpense === searchType)
        
        return searchTypeExpenses

    }

    
    async getExpensesByDate (
        cardId : number,
        dateType : "year" | "month" | "week" | "day",
        dateValue : { year : number, month? : monthType, week? : 1|2|3|4|5, day? : number}        
    ){
        const handleCard = new HandleCard()
        const card  = await handleCard.getCard(cardId)

        if (!card) return "card dont exist"
        
        const SelectedYearExpenses  = card.expenses.filter((expense : any) => expense.yearExpenses.filter((yearExpense : yearExpensesType) => yearExpense.year === dateValue.year))

        if (SelectedYearExpenses.length === 0) return "no expenses in this year"

        const selectedYearExpenses = SelectedYearExpenses[0].yearExpenses[0].AllExpenses

        if (dateType === "year") return selectedYearExpenses
        if(dateValue.month) {
            const monthExpenses  = selectedYearExpenses.filter((expense : any) => expense.month === dateValue.month)
            if (dateType === "month") return monthExpenses
            else if (dateType === "week") {
                let startDayWeek : number = 1
                let endDayWeek : number = 7

                if (dateValue.week === 1) {
                    startDayWeek = 1
                    endDayWeek = 7
                }
                else if (dateValue.week === 2) {
                    startDayWeek = 8
                    endDayWeek = 14
                }
                else if (dateValue.week === 3) {
                    startDayWeek = 15
                    endDayWeek = 21
                }
                else if (dateValue.week === 4) {
                    startDayWeek = 22
                    endDayWeek = 28
                }
                else if (dateValue.week === 5) {
                    startDayWeek = 29
                    endDayWeek = 31
                }

                const dayExpenses  = monthExpenses.filter((expense) => expense.day >= startDayWeek && expense.day <= endDayWeek)
                return dayExpenses
            }
            else if (dateType === "day") {
                const dayExpenses = monthExpenses.filter((expense) => expense.day === dateValue.day)
                return dayExpenses
            }
            
        }
        
    }

    async deleteExpense(expenseId : number, cardId : number ) {
        const handleCard = new HandleCard()
        const card  = await handleCard.getCard(cardId)

        if (!card) return "card dont exist"

        const expense = await prisma.expense.findFirst({
            where: {id: expenseId}
        })

        if (!expense) return "expense dont exist"

        try {
            await prisma.expense.delete({
                where : {id : expenseId}
            })
            return "expense deleted"
        } catch (error) {
            return "error deleting expense"
        }
    }

    async createExpense(
        cardId : number,
        expenseInfo : expenseInfoType
    ){
        const handleCard = new HandleCard()
        const card  = await handleCard.getCard(cardId)

        if (!card) return "card dont exist"
        
        const expenseWithSameName = await prisma.expense.findMany({
            where : {
                name : expenseInfo.name,
            }
        })

        if (expenseWithSameName.length > 0) expenseInfo.visibleName = `${expenseInfo.name} (${expenseWithSameName.length + 1})`

        try{
            const newExpense = await prisma.expense.create({
                data : {
                    yearExpensesId: card.expenses[0].yearExpenses[0].id,
                    ...expenseInfo
                }
            })
    
            return newExpense
        } catch (error) {
            return "error creating expense"
        } 

    }

    async updateExpense (
        expenseId : number,
        updateKey : "value" | "name",
        updateValue : string | number
    ){
        const expense  = await prisma.expense.findFirst({
            where : {id : expenseId}
        })

        if (!expense) return "expense dont exist"
        
        try{
            const updatedExpense = await prisma.expense.update({
                where : {id : expenseId},
                data : {
                    [updateKey] : updateValue
                }
            })

            return updatedExpense
        } catch (error) {
            return "error updating expense"
        }
    }
}

export default HandleExpenses