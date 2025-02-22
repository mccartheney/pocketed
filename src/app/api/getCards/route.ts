import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

const GET = async (
    req: NextRequest
) => {

}

export {GET}