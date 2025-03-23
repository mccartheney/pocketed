"use server"

import {expenseType, monthType, timeTypeExpense, weekDayType } from "@/types/cardtype"
import HandleCard from "./handleCard"
import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

//  type expense info
type expenseInfoType = {
    value : number
    visibleName : string
    name : string
    timeTypeExpense : timeTypeExpense
    month : monthType
    day : number
    dayOfWeek : weekDayType
}

//  class handle expenses
class HandleExpenses {
    //  method to get expenses
    async getExpenses(
        cardId : number, 
        year : number,
        searchType : "unique" | "mensal" | "all"
    ) {
        //  init handle card
        const handleCard = new HandleCard()
        //  get card
        const card = await handleCard.getCard(cardId)

        if (!card) return "card dont exist"

        //  get selected year expenses
        const SelectedYearExpenses = card.expenses.filter((expense) => expense.year === year)
        if (SelectedYearExpenses.length === 0) return "no expenses in this year"

        //  get all expenses        
        const yearAllExpenses = SelectedYearExpenses
        //  get search type expenses
        const searchTypeExpenses = yearAllExpenses.filter((expense) => expense.timeTypeExpense === searchType)
        
        // return searched expenses
        if (searchType === "all") return yearAllExpenses
        return searchTypeExpenses

    }   

    //  method to get expenses by date
    async getExpensesByDate (
        cardId : number,
        dateType : "year" | "month" | "week" | "day",
        dateValue : { year : number, month? : monthType, week? : 1|2|3|4|5, day? : number}        
    ){
        //  init handle card and 
        const handleCard = new HandleCard()
        const card  = await handleCard.getCard(cardId)

        if (!card) return "card dont exist"
        
        //  get selected year expenses
        const SelectedYearExpenses  = card.expenses.filter((expense) => expense.year === dateValue.year)
        if (SelectedYearExpenses.length === 0) return "no expenses in this year"

        //  get selected year expenses
        const selectedYearExpenses = SelectedYearExpenses

        //  return selected year expenses
        if (dateType === "year") return selectedYearExpenses
        if(dateValue.month) {
            //  get month expenses
            const monthExpenses  = selectedYearExpenses.filter((expense : any) => expense.month === dateValue.month)
            //  return expense by searched date
            if (dateType === "month") return monthExpenses
            else if (dateType === "week") {
                //  get start and end day of week
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
                
                //  get week expenses and return
                const dayExpenses  = monthExpenses.filter((expense) => expense.day >= startDayWeek && expense.day <= endDayWeek)
                return dayExpenses
            }
            else if (dateType === "day") {
                //  get day expenses and return
                const dayExpenses = monthExpenses.filter((expense) => expense.day === dateValue.day)
                return dayExpenses
            }            
        }
        
    }

    //  method to delete expense
    async deleteExpense(expenseName : string, cardId : number ) {
        //  init handle card and get card
        const handleCard = new HandleCard()
        const oldCard  = await handleCard.getCard(cardId)

        //  if card dont exist, return error
        if (!oldCard) return "card dont exist"

        //  get expense
        const expense = await prisma.expense.findFirst({
            where: {name: expenseName, cardId : cardId}
        })

        //  if expense dont exist, return error
        if (!expense) return "expense not found"

        //  delete expense
        try {
            await prisma.expense.delete({
                where : {id : expense.id}
            })

            await prisma.card.update({
                where: {
                    id: cardId,
                },
                data: {
                    balance: oldCard.balance + expense.value,
                },
            });
            
            //  get card and return
            const card = await handleCard.getCard(cardId)
            
            //  disconnect prisma and return card
            await prisma.$disconnect()
            return card
        } catch (error) {
            //  disconnect prisma and return error
            await prisma.$disconnect()
            return "error deleting expense"
        }
    }

    //  method to create expense
    async createExpense(
        cardId : number,
        expenseInfo : expenseType
    ){
        //  init handle card and get card
        const handleCard = new HandleCard()
        const card  = await handleCard.getCard(cardId)

        //  if card dont exist, return error
        if (!card) return "card dont exist"

        //  get expense with same name
        const expenseWithSameName = await prisma.expense.findMany({
            where : {
                name : expenseInfo.name,
            }
        })
        
        //  if expense with same name, add number to name
        if (expenseWithSameName.length > 0) expenseInfo.visibleName = `${expenseInfo.name} (${expenseWithSameName.length + 1})`

        console.log(expenseInfo)
        //  create expense
        try{
            const newExpense = await prisma.expense.create({
                data : {
                    ...expenseInfo,
                }
            })

            await prisma.card.update({
                where: {
                    id: cardId,
                },
                data: {
                    balance: card.balance - expenseInfo.value,
                },
            });

            //  disconnect prisma and return expense
            await prisma.$disconnect()

            return newExpense
        } catch (error) {
            //  disconnect prisma and return error
            await prisma.$disconnect()
            return "error creating expense"
        } 

    }

    //  method to update expense
    async updateExpense (
        expenseId : number,
        updateKey : "value" | "name",
        updateValue : string | number
    ){
        //  get expense
        const expense  = await prisma.expense.findFirst({
            where : {id : expenseId}
        })

        //  if expense dont exist, return error
        if (!expense) return "expense dont exist"
        
        //  update expense
        try{
            const updatedExpense = await prisma.expense.update({
                where : {id : expenseId},
                data : {
                    [updateKey] : updateValue
                }
            })

            //  disconnect prisma and return expense
            await prisma.$disconnect()
            return updatedExpense
        } catch {
            //  disconnect prisma and return error
            await prisma.$disconnect()
            return "error updating expense"
        }
    }
}

export default HandleExpenses