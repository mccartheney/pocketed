import months from "@/constants/months";
import WeekDays from "@/constants/weekDays";
import { expenseType } from "@/types/expensesType";
import getUser from "@/utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type expensePostType = {
    email: string,
    cardName: string,
    expenseName: string,
    expenseValue: number,
    expenseType: "unique" | "mensal"
}

const prisma = new PrismaClient()

const POST = async (req: NextRequest) => {
    // get body
    const { email, cardName, expenseName, expenseValue, expenseType }: expensePostType = await req.json()

    // get user
    const user = await getUser(email)
    if (!user) return NextResponse.json({ status: 404, message: "User not found" })

    // get card
    const card = await prisma.card.findFirst({
        where: {
            userId: user.id,
            name: cardName
        }
    })
    if (!card) return NextResponse.json({ status: 404, message: "Card not found to add expense" })

    const date = new Date()

    // get dates
    const actualMonth = months[date.getMonth()]
    const actualWeekDay = WeekDays[date.getDay()]
    const actualMonthDay = date.getDate()
    const actualYear = date.getFullYear()

    // add mensal expense
    if (expenseType === "mensal") {
        // get mensal expenses
        const mensalExpenses = card.expenses![actualYear][actualMonth][expenseType]

        // verify if expense already exists
        const expenseExists = mensalExpenses.some((expense: { name: string }) => expenseName in expense)
        if (expenseExists) return NextResponse.json({ status: 402, message: "Expense already exists" })

        // create new expense
        const newMensalExpense: expenseType = {
            [expenseName]: expenseValue
        }

        // add this expense to the card expense
        card.expenses[actualYear][actualMonth][expenseType].push(newMensalExpense)

        // update the card with the updated expenses
        try {
            const updatedCard = await prisma.card.update({
                where: {
                    id: card.id!
                },
                data: {
                    expenses: card.expenses!
                }
            })

            return NextResponse.json({ status: 200, message: "Expense added" })
        } catch (error) { return NextResponse.json({ status: 500, message: "Error adding expense" }) }

    }
    // add unique expense
    else if (expenseType === "unique") {

        // get actual week 
        let weekNumber: number = 0
        if (actualMonthDay <= 7) weekNumber = 1
        if (actualMonthDay > 7 && actualMonthDay <= 14) weekNumber = 2
        if (actualMonthDay > 14 && actualMonthDay <= 21) weekNumber = 3
        if (actualMonthDay > 21 && actualMonthDay <= 28) weekNumber = 4
        if (actualMonthDay > 28) weekNumber = 5
        const actualWeek: string = `week${weekNumber}`

        // create expense
        const newUniqueExpense : expenseType = {[expenseName] : expenseValue}
        const thisExpeseExists = card.expenses![actualYear]![actualMonth][expenseType][actualWeek][actualWeekDay].some((expense : {name : string}) => expenseName in expense)

        if (thisExpeseExists) return NextResponse.json({status : 402, message : "Expense already exists"})
        card.expenses![actualYear]![actualMonth][expenseType][actualWeek][actualWeekDay].push(newUniqueExpense)

        // update card
        try {
            const updatedCard = await prisma.card.update({
                where : {
                    id : card.id!
                },
                data : {
                    expenses : card.expenses!
                }
            })

            return NextResponse.json({status : 200, message : "Expense added"})
        } catch (error) {
            return NextResponse.json({status : 200, message : "Error adding expense"})
        }
    }

    return NextResponse.json({ status: 500, message: "Error on server" })
}

export { POST }

