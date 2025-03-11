import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

//  check if user exists
async function CheckUserExists(email: string) {
    // get user from database
    const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
            friends: true,
            friendOf: true,
            cards: true
        }
    })
    // return user
    return user
}

export default CheckUserExists