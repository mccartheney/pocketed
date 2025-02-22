import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

const GET = async (
    req:NextRequest
) => {
    const params = req.nextUrl.searchParams
    const email = params.get("email")!

    const user : userApiType = await prisma.user.findUnique({
        where :{email}
    })

    return NextResponse.json([user])
}

export {GET}