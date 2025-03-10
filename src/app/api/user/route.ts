import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

const GET = async (req:NextRequest) => {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    console.log(email)

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    return NextResponse.json({ message: user })
}

export { GET }