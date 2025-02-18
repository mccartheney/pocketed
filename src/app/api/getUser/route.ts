import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

const GET = async (
    req:NextRequest
) => {
    const params = req.nextUrl.searchParams
    console.log(params)
    const email = params.get("email")!

    const user = await prisma.user.findUnique({
        where :{email}
    })

    return NextResponse.json([user])
}

export {GET}