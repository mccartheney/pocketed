import getCardStructure from "@/utils/createCardStructure";
import getUser from "@/utils/getUser";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

const GET = async (
    req: NextRequest
) => {
    // get email from params 
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const CardName = searchParams.get("cardName")

    if (!email) return NextResponse.json({ status: 400, message: "Email is required" });

    // get user from email
    const user = await getUser(email)
    if (!user) return NextResponse.json({ status: 404, message: "User not found" })

    if (CardName) {
        // try to get cards and return them
        try {
            const card = await prisma.card.findFirst({
                where: { userId: user.id, name : CardName}
            })

            if (card) return NextResponse.json({ status: 200, message: card })
            return NextResponse.json({ status: 404, message: "this Card Dont Exists" });

        } catch (error) {
            return NextResponse.json({ status: 500, message: "Problem getting card" });
        }
    }
    // try to get cards and return them
    try {
        const cards = await prisma.card.findMany({
            where: { userId: user.id }
        })

        return NextResponse.json({ status: 200, message: cards })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Problem getting cards" });
    }

}

const PUT = async (req : NextRequest) => {
    const {email, cardName, newCardName} = await req.json()

    // get user by email
    const user = await getUser(email)
    if (!user) return NextResponse.json({ status: 404, message: "User not found" })

    // get card by user
    const cardToRename = await prisma.card.findFirst({
        where: { userId: user.id }
    })
    if (!cardToRename) return NextResponse.json({ status: 404, message: "Card to Rename not found" })

    // verify if card with new name exists
    const cardWithNewNameExists = await prisma.card.findFirst({
        where : {userId : user.id, name : newCardName}
    })
    if (cardWithNewNameExists) return NextResponse.json({ status: 409, message: "Card with new name already exists" }) 

    // update card name
    try {
        const updatedCard = await prisma.card.update({
            where: { id: cardToRename.id },
            data: { name: newCardName } 
        })
        return NextResponse.json({ status: 200, message: updatedCard })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Problem renaming card" })
    }
    
}

const DELETE = async (req: NextRequest) => {
    const { email, cardName } = await req.json()

    // get user by email
    const user = await getUser(email)
    if (!user) return NextResponse.json({ status: 404, message: "User not found" })

    // get card by user
    const cardToDelete = await prisma.card.findFirst({
        where: { userId: user.id, name : cardName }
    })
    if (!cardToDelete) return NextResponse.json({ status: 404, message: "Card to delete not found" })

    // delete card
    try {
        await prisma.card.delete({
            where: { id: cardToDelete.id, name : cardName }
        })
        return NextResponse.json({ status: 200, message: "Card deleted" })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Problem deleting card" })
    }
}

const POST = async (req: NextRequest) => {
    const { cardName, initialValue, userEmail } = await req.json()

    // verify if user email exists
    const user = await getUser(userEmail)
    if (!user) return NextResponse.json({ status: 404, message: "User dont exists" })

    // verify if card exists
    const card = await prisma.card.findFirst({
        where: { userId: user.id, name : cardName }
    })
    if (card) return NextResponse.json({ status: 409, message: "Card already exists" })

    // create card
    try {
        const newCard = await prisma.card.create({
            data: {
                name: cardName,
                totalAmount: initialValue,
                userId: user.id,
                expenses: getCardStructure()!
            }
        })

        return NextResponse.json({ status: 200, message: "Card Created" })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Problem creating card" })
    }
}

export { GET, DELETE, POST, PUT }