import getCardStructure from "@/utils/createCardStructure"
import getUser from "@/utils/getUser"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

type createCardBodyType = {
    cardName : string, 
    initialValue : number, 
    userEmail : string
}

const POST = async (req: NextRequest) => {
    const {cardName, initialValue, userEmail} : createCardBodyType = await req.json()

    // verify if user email exists
    const user = await getUser(userEmail)
    if (!user) return NextResponse.json ({status:404, message : "User dont exists"})

    // verify if card exists
    const card = await prisma.card.findFirst({
        where : {userId : user.id}
    }) 
    if (card) return NextResponse.json ({status : 409, message : "Card already exists"})

    // create card
    try {
        const newCard = await prisma.card.create({
            data : {
                name : cardName,
                totalAmount : initialValue,
                userId : user.id,
                expenses : getCardStructure()!
            }
        })

        return NextResponse.json ({status:200, message : newCard})
    }catch (error) {
        return NextResponse.json ({status:500, message : "Problem creating card"})
    }
}

export { POST }