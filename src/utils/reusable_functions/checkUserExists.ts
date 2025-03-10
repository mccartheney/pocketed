import { PrismaClient } from "@prisma/client"
import userType from "@/types/userType"

const prisma = new PrismaClient()

async function CheckUserExists(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
            friends: true,
            friendOf: true,
            cards: true
        }
    })
    return user
}

export default CheckUserExists