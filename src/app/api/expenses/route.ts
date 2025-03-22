import { NextRequest, NextResponse } from "next/server"
 
import { expenseType, monthType, weekDayType } from "@/types/cardtype"
import HandleCard from "@/utils/handles/handleCard"
import HandleExpense from "@/utils/handles/handleExpenses"

// method to create a new expense
const POST = async (req: NextRequest) => {
    // get necessary parameters
    const { cardId, value, visibleName, name, timeTypeExpense, month, day, dayOfWeek, year }
     :expenseType= await req.json()

    // create the expense
    const handleExpense = new HandleExpense()
    const expense = await handleExpense.createExpense(
        cardId,
        {
            name,
            value,
            visibleName,
            timeTypeExpense,
            month,
            day,
            dayOfWeek,
            year,
            cardId
        }
    )

    // if error creating expense, if not return 400
    if (expense == "error creating expense") return NextResponse.json({ status: 400, message: "Error creating expense" })
    // if card dont exist, if not return 400
    if (expense == "card dont exist") return NextResponse.json({ status: 400, message: "Expense already exists" })                                                                       
    // return the expense
    return NextResponse.json({ status: 200, message: "Expense created successfully", expense })
}

// method to get expenses
const GET = async   (req: NextRequest) =>{
    const { searchParams } = new URL(req.url)

    // get necessary parameters
    const cardId : number = Number(searchParams.get("cardId"))
    const year : number = Number(searchParams.get("year"))
    const month : monthType = searchParams.get("month") as monthType
    const day : number = Number(searchParams.get("day"))
    const dayOfWeek: weekDayType = searchParams.get("dayOfWeek") as weekDayType
    const weekNumber : number = Number(searchParams.get("weekNumber"))
    const isAllExpenses : boolean = searchParams.get("isAllExpenses") === "true"

    // get the card
    const handleCard = new HandleCard()
    const card = await handleCard.getCard(cardId)

    // if card dont exist, if not return 404
    if (!card) return NextResponse.json({ status: 404, message: "Card not found" })

    // if user wants all expenses, return all expenses
    if (isAllExpenses === true) {
        // get all expenses and return them
        const expenses = card.expenses
        return NextResponse.json({ status: 200, message: expenses })
    }

    // if user wants expenses by year
    if (year) {
        // get expenses by year
        const YearExpenses = card.expenses.filter((expense) => expense.year === year)

        // if user dont want to extend the search to month, return expenses by year
        if (!month) return NextResponse.json({ status: 200, message: YearExpenses })

        // get expenses by month
        const MonthExpenses = YearExpenses.filter((expense) => expense.month === month)

        // if user dont want to extend the search to day or week, return expenses by month
        if (!day && !dayOfWeek && !weekNumber) return NextResponse.json({ status: 200, message: MonthExpenses })

        // if user wants expenses by day or day of week
        if (day || dayOfWeek) {
            // if user wants expenses by day
            if (day) {
                // get expenses by day and return them
                const DayExpenses = MonthExpenses.filter((expense) => expense.day === day)
                return NextResponse.json({ status: 200, message: DayExpenses })
            }
            
            // if user wants expenses by week
            if (dayOfWeek) {
                // get expenses by week and return them
                const DayOfWeekExpenses = MonthExpenses.filter((expense) => expense.dayOfWeek === dayOfWeek)
                return NextResponse.json({ status: 200, message: DayOfWeekExpenses })
            }
        }

        // if user dont want to extend the search to day or week, return expenses by month
        if (!day && !dayOfWeek && !weekNumber) return NextResponse.json({ status: 200, message: MonthExpenses })

        // if user wants expenses by week number
        if (weekNumber) {
            // get the initial and final day of the week
            let initialDay = 0
            let finalDay = 0

            // get the initial and final day of the week
            switch (weekNumber) {
                case 1:
                    initialDay = 1
                    finalDay = 7
                    break
                case 2:
                    initialDay = 8
                    finalDay = 14
                    break
                case 3:
                    initialDay = 15
                    finalDay = 21
                    break
                case 4:
                    initialDay = 22
                    finalDay = 28
                    break
                case 5:
                    initialDay = 29
                    finalDay = 31
                    break
            }

            // get the expenses by day
            const expensesByDay = {
                Monday : 0,
                Tuesday : 0,
                Wednesday : 0,
                Thursday : 0,
                Friday : 0,
                Saturday : 0,
                Sunday : 0
            }

            // get the expenses by day
            const WeekExpenses = MonthExpenses.filter((expense) => expense.day >= initialDay && expense.day <= finalDay)
            const uniqueWeekExpenses = WeekExpenses.filter((expense) => expense.timeTypeExpense === "unique")

            // sum the expenses by day
            uniqueWeekExpenses.forEach((expense) => {
                const dayOfWeek = expense.dayOfWeek as keyof typeof expensesByDay;
                expensesByDay[dayOfWeek] += Number(expense.value);
            });

            // return the expenses by week and by day
            return NextResponse.json({ status: 200, message: uniqueWeekExpenses, byDay : expensesByDay })
        }
    }

    // if user dont want to extend the search to year, month, day or week, return 400
    return NextResponse.json({ status: 400, message: "Invalid request" })

}

// method to delete an expense
const DELETE = async (req: NextRequest) => {
    // get necessary parameters
    const { expenseName, expenseCardId } = await req.json()

    // delete the expense
    const handleExpense = new HandleExpense()
    const expense = await handleExpense.deleteExpense(expenseName, expenseCardId)

    // if card dont exist, if not return 404
    if (expense == "card dont exist") return NextResponse.json({ status: 404, message: "Card not found" })
    // if error deleting expense, if not return 500
    if (expense == "error deleting expense") return NextResponse.json({ status: 500, message: "Error deleting expense" })
    // if expense not found, if not return 404
    if (expense == "expense not found") return NextResponse.json({ status: 404, message: "Expense not found" })

    // return the updated expenses
    return NextResponse.json({ status: 200, message: "Expense deleted successfully", updatedExpenses : expense!.expenses })
}

export { GET, POST, DELETE }