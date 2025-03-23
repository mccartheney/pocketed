import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import HandleIncomes from "@/utils/handles/handleIncomes";

const GET = async (req: NextRequest) => {
    // get cardId from params
    const { searchParams } = new URL(req.url);
    const cardId = searchParams.get("cardId");

    // if user dont send cardId, return an error
    if (!cardId) return NextResponse.json({status:400, message: "Card ID is required"});

    // get all incomes
    const handleIncomes = new HandleIncomes();
    const incomes = await handleIncomes.getAllIncomes(Number(cardId));

    // if there is an error, return an error
    if (incomes === "Error getting incomes") return NextResponse.json({status : 500, message: "Error getting incomes"});
    if (incomes === "Card not found") return NextResponse.json({status:404, message: "Card not found"});

    // return the incomes
    return NextResponse.json({status:200, message: "Incomes fetched successfully", incomes: incomes});
}

const POST = async (req: NextRequest) => {
    // get name, value and cardId from body
    const { name, value, cardId } = await req.json();

    // if user dont send cardId, return an error
    if (!cardId) return  NextResponse.json({status:400, message: "Card ID is required"});

    // create a new income
    const handleIncomes = new HandleIncomes();
    const incomes = await handleIncomes.createIncome(Number(cardId), name, Number(value));

    // if there is an error, return an error
    if (incomes == "Error creating income") return NextResponse.json({status:500, message: "Error creating income"});
    if (incomes == "Card not found") return NextResponse.json({status:404, message: "Card not found"});

    // return the income
    return NextResponse.json({status:200, message: "Income created successfully", income: incomes});
}

const DELETE = async (req: NextRequest) => {
    // get incomeId from body
    const {incomeId} = await req.json()

    // if user dont send incomeId, return an error
    if (!incomeId) return NextResponse.json({status:400, message: "Income ID is required"});

    // delete the income
    const handleIncomes = new HandleIncomes();
    const incomes = await handleIncomes.deleteIncome(Number(incomeId));

    // if there is an error, return an error
    if (incomes === "Error deleting income") return NextResponse.json({status:500, message: "Error deleting income"});
    if (incomes === "Income not found") return NextResponse.json({status:404, message: "Income not found"});

    // return a success message
    return NextResponse.json({status:200, message: "Income deleted successfully"});
}
export { GET, POST, DELETE };