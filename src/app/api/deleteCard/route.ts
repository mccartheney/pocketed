import getUser from "@/utils/getUser"
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

const DELETE = async (req:NextRequest) => {
    const { email } = await req.json ()

    // get user by email
    const user = await getUser(email)
    if (!user) return NextResponse.json({status:404, message:"User not found"})

    // get card by user
    const cardToDelete = await prisma.card.findFirst({
        where :{userId : user.id}
    })
    if(!cardToDelete) return NextResponse.json({status:404, message:"Card to delete not found"})

    // delete card
    try {
        await prisma.card.delete ({
            where : {id : cardToDelete.id}
        })
        return NextResponse.json({ status: 200, message: "Card deleted" })
    } catch (error) {
        return NextResponse.json({status:500, message:"Problem deleting card"})
    }
}

export {DELETE}