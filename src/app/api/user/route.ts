import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

const GET = async (req: NextRequest) => {
    // get user email
    const {searchParams} = new URL (req.url)
    const userEmail = searchParams.get("email")

    // get users or user if the user send email
    try {
        if (userEmail) {
            const user = await prisma.user.findFirst({
                where : {email: userEmail}
            })

            if (!user) return NextResponse.json({status : 404, message : "User dont found"})

            return NextResponse.json({ status: 200, message: user })    
        }

        const allUsers = await prisma.user.findMany ()
        return NextResponse.json({status : 200, message:allUsers})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: 500, message: "Error getting users" })
    }

}

const PUT = async (req : NextRequest) => {
    // get params from user
    const {email, NewImageSrc, newUserName} = await req.json()

    // get user
    const user = await prisma.user.findFirst({
        where : {email : email}
    })
    if (!user) return NextResponse.json({ status: 404, message: "User dont found" })

    // if want to change image
    if (NewImageSrc) {
        try {
            const updatedUser = await prisma.user.update({
                where: { email: email },
                data: { image: NewImageSrc }
            })

            return NextResponse.json({ status: 200, message: "User profile picture updated", UUser: updatedUser })
        } catch (error) {
            console.error(error)
            return NextResponse.json({ status: 500, message: "Error updating profile pic" })
        }
    }else if (newUserName) { // if want to change username
        try {
            const updateUser = await prisma.user.update({
                where: { email: email },
                data: { name: newUserName }
            })

            return NextResponse.json({ status: 200, message: "User Name updated", UUser : updateUser })
        } catch (error) {
            console.error(error)

            return NextResponse.json({ status: 500, message: "Error updating user name" })
        }
    }

    // remove profile pic
    try {
        const profilePicImagePh = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

        const updatedUser = await prisma.user.update ({
            where : {email : email},
            data: { image: profilePicImagePh }
        })

        return NextResponse.json({ status: 200, message: "User profile picture Removed", UUser : updatedUser })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: 500, message: "Error updating profile pic" })
    }

}

export {GET, PUT}