import HandleUser from "@/utils/handles/handleUser"
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

    const user = await prisma.user.findFirst({
        where: { email }
    })

    return NextResponse.json({ message: user })
}

const PUT = async (req:NextRequest) => {
    const { updateKey, keyValue, email } = await req.json()
    
    if (!email) {
        return NextResponse.json({status: 400, message: "Email is required"})
    }
    
    const handleUser = new HandleUser()
    const user = await handleUser.updateUser(email, updateKey, keyValue)
    
    if (!user) {
        return NextResponse.json({status: 400, message: "User not found"})
    }

    if (!updateKey || !keyValue) {
        const avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzkqmu8RTm0bAg4s0ShPQzvDuTlRzQB1kaQ&s"
        const userWithOutImg = await handleUser.updateUser(email, "imgUrl", avatar)

        return NextResponse.json({ status: 200, message: "User image removed", UUser: userWithOutImg })

    }

    return NextResponse.json({status: 200, message: "User updated", UUser: user})
    
}

const DELETE = async (req:NextRequest) => {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
        return NextResponse.json({status: 400, message: "Email is required"})
    }

    const handleUser = new HandleUser()
    const user = await handleUser.deleteUser(email)

    return NextResponse.json({status: 200, message: "User deleted", UUser: user})
    
}
export { GET, PUT, DELETE }