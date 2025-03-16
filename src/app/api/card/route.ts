import { NextRequest, NextResponse } from "next/server"
import HandleCard from "@/utils/handles/handleCard"

const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const cardId = Number(searchParams.get("cardId"))
    const handleCard = new HandleCard()

    if (!email) {
        return NextResponse.json({ status: 400, message: "Email is required" })
    }
    if (cardId) {
        const card = await handleCard.getCard(cardId)
        if (!card) return NextResponse.json({ status: 404, message: "Card not found" })
        return NextResponse.json({ status: 200, message: card })
    }

    const cards = await handleCard.getCards(email)

    if (cards == "User dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })

    return NextResponse.json({ status: 200, message: cards })
}

const POST = async (req: NextRequest) => {
    const { email, cardName, cardBalance } = await req.json()
    const handleCard = new HandleCard()

    const card = await handleCard.createCard(email, cardName, cardBalance)

    if (card == "User dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })
    else if (card == "Card already exists") return NextResponse.json({ status: 402, message: "Card already exists" })

    return NextResponse.json({ status: 200, message: card })
}

const DELETE = async (req: NextRequest) => {
    const { email, cardId } = await req.json()
    const handleCard = new HandleCard()

    const card = await handleCard.deleteCard(email, cardId)

    if (card === "user dont exists") return NextResponse.json({ status: 404, message: "User dont exists" })
    else if (card === "card dont exists") return NextResponse.json({ status: 404, message: "Card not found" })
    else if (card === "card deleted") return NextResponse.json({ status: 200, message: "Card deleted" })

    return NextResponse.json({ status: 200, message: "Card deleted" })
}

const PUT = async (req: NextRequest) => {
    const { email, cardId, newName } = await req.json()
    const handleCard = new HandleCard()

    const card = await handleCard.renameCard(email, cardId, newName)
    
    if (card === "user dont exists") return NextResponse.json({ status: 404, message: "User dont exists" }) 
    else if (card === "card dont exists") return NextResponse.json({ status: 404, message: "Card not found" })
    else if (card === "card name already exists") return NextResponse.json({ status: 402, message: "Card name already exists" })

    return NextResponse.json({ status: 200, message: "Card renamed", card : card })
}

export { GET, POST, DELETE, PUT }