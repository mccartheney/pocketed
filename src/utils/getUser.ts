import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getUser = async (email : string) => {
    const userExists : userApiType = await prisma.user.findUnique ({
        where : {email}
    })

    if (!userExists) return null

    return userExists
}

export default getUser