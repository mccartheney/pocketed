import { NextRequest, NextResponse } from "next/server"
 
import { expenseType, monthType, weekDayType } from "@/types/cardtype"
import HandleCard from "@/utils/handles/handleCard"
import HandleExpense from "@/utils/handles/handleExpenses"
const POST = async (req: NextRequest) => {
    const { cardId, value, visibleName, name, timeTypeExpense, month, day, dayOfWeek, year }
     :expenseType= await req.json()

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

    if (expense == "error creating expense") return NextResponse.json({ status: 400, message: "Error creating expense" })
    if (expense == "card dont exist") return NextResponse.json({ status: 400, message: "Expense already exists" })                                                                       

    return NextResponse.json({ status: 200, message: "Expense created successfully", expense })
}

const GET = async   (req: NextRequest) =>{
    const { searchParams } = new URL(req.url)

    const cardId : number = Number(searchParams.get("cardId"))
    const year : number = Number(searchParams.get("year"))
    const month : monthType = searchParams.get("month") as monthType
    const day : number = Number(searchParams.get("day"))
    const dayOfWeek: weekDayType = searchParams.get("dayOfWeek") as weekDayType
    const weekNumber : number = Number(searchParams.get("weekNumber"))
    const isAllExpenses : boolean = searchParams.get("isAllExpenses") === "true"

    const handleCard = new HandleCard()
    const card = await handleCard.getCard(cardId)

    if (!card) return NextResponse.json({ status: 404, message: "Card not found" })

    if (isAllExpenses === true) {
        const expenses = card.expenses
        return NextResponse.json({ status: 200, message: expenses })
    }

    if (year) {

        const YearExpenses = card.expenses.filter((expense) => expense.year === year)
        if (!month) return NextResponse.json({ status: 200, message: YearExpenses })

        const MonthExpenses = YearExpenses.filter((expense) => expense.month === month)

        if (day || dayOfWeek) {
            if (day) {
                const DayExpenses = MonthExpenses.filter((expense) => expense.day === day)
                return NextResponse.json({ status: 200, message: DayExpenses })
            }
            
            if (dayOfWeek) {
                const DayOfWeekExpenses = MonthExpenses.filter((expense) => expense.dayOfWeek === dayOfWeek)

                const DayOfWeekExpensesByDay = {
                    monday : 0,
                    tuesday : 0,
                    wednesday : 0,
                    thursday : 0,
                    friday : 0,
                    saturday : 0,
                    sunday : 0  
                }

                DayOfWeekExpenses.forEach((expense) => {
                    const day = expense.day
                    const dayOfWeek = expense.dayOfWeek
                })
                
                return NextResponse.json({ status: 200, message: DayOfWeekExpenses })
            }
        }

        if (!day && !dayOfWeek && !weekNumber) return NextResponse.json({ status: 200, message: MonthExpenses })

        if (weekNumber) {

            let initialDay = 0
            let finalDay = 0

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
            
            const expensesByDay = {
                Monday : 0,
                Tuesday : 0,
                Wednesday : 0,
                Thursday : 0,
                Friday : 0,
                Saturday : 0,
                Sunday : 0
            }

            const WeekExpenses = MonthExpenses.filter((expense) => expense.day >= initialDay && expense.day <= finalDay)

            WeekExpenses.forEach((expense) => {
                const dayOfWeek = expense.dayOfWeek as keyof typeof expensesByDay;
                expensesByDay[dayOfWeek] += Number(expense.value);
            });
            
            return NextResponse.json({ status: 200, message: WeekExpenses, byDay : expensesByDay })
        }
    }
    return NextResponse.json({ status: 400, message: "Invalid request" })

}

export { GET, POST }