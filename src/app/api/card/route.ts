import { NextRequest, NextResponse } from "next/server"
import HandleCard from "@/utils/handles/handleCard"

// get method to get all cards of a specific user
const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    // get all necessary parameters
    const email = searchParams.get("email")
    const cardId = Number(searchParams.get("cardId"))
    const handleCard = new HandleCard()

    // check if user sent email, if not return 400
    if (!email) return NextResponse.json({ status: 400, message: "Email is required" })

    // check if user sent cardId, if not return 404
    if (cardId) {
        // get the card
        const card = await handleCard.getCard(cardId)
        // if card dont exists, return 404
        if (!card) return NextResponse.json({ status: 404, message: "Card not found" })
        // return the card
        return NextResponse.json({ status: 200, message: card })
    }

    // get all cards of the user
    const cards = await handleCard.getCards(email)

    // check if user dont exists, if not return 404
    if (cards == "User dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })

    // return all cards of the user
    return NextResponse.json({ status: 200, message: cards })
}

// method to create a new card
const POST = async (req: NextRequest) => {
    // get necessary parameters
    const { email, cardName, cardBalance } = await req.json()
    const handleCard = new HandleCard()

    // create the card
    const card = await handleCard.createCard(email, cardName, cardBalance)

    // if user dont exists, if not return 404
    if (card == "User dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })
    // if card already exists, if not return 402
    else if (card == "Card already exists") return NextResponse.json({ status: 402, message: "Card already exists" })

    // return the card
    return NextResponse.json({ status: 200, message: card })
}

// method to delete a card
const DELETE = async (req: NextRequest) => {
    // get necessary parameters
    const { email, cardId } = await req.json()
    const handleCard = new HandleCard()

    // delete the card
    const card = await handleCard.deleteCard(email, cardId)

    // if user dont exists, if not return 404
    if (card === "user dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })
    // if card dont exists, if not return 404
    else if (card === "card dont exists") return NextResponse.json({ status: 404, message: "Card not found" })
    // if card deleted, if not return 200
    else if (card === "card deleted") return NextResponse.json({ status: 200, message: "Card deleted" })
}

// method to rename a card
const PUT = async (req: NextRequest) => {
    // get necessary parameters
    const { email, cardId, newName } = await req.json()
    const handleCard = new HandleCard()

    // rename the card
    const card = await handleCard.renameCard(email, cardId, newName)

    // if user dont exists, if not return 404
    if (card === "user dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })
    // if card dont exists, if not return 404   
    else if (card === "card dont exists") return NextResponse.json({ status: 404, message: "Card not found" })
    // if card name already exists, if not return 402
    else if (card === "card name already exists") return NextResponse.json({ status: 402, message: "Card name already exists" })

    // return the card
    return NextResponse.json({ status: 200, message: "Card renamed", card : card })
}

export { GET, POST, DELETE, PUT }