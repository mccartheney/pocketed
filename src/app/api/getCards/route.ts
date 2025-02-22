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

    if (!email) return NextResponse.json({status:400, message:"Email is required"});

    // get user from email
    const user = await getUser(email)
    if(!user) return NextResponse.json({status:404, message:"User not found"})

    // try to get cards and return them
    try {
        const cards = await prisma.card.findMany({
            where : {userId : user.id}
        })

        return NextResponse.json({status:200, message:cards})
    } catch (error) {
        return NextResponse.json({ status:500, message : "Problem getting cards" });
    }

}

export {GET}