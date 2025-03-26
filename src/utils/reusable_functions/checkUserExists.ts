import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

//  check if user exists
async function CheckUserExists(email: string) {

    // get user from database
    const user = await prisma.user.findFirst({
        where: { email: email },
        include: {
            friends: {
                include: {
                    cards: true
                }
            },
            friendOf: true,
            cards: true
        }
    })

    //  disconnect prisma and return user
    await prisma.$disconnect()
    return user
}

export default CheckUserExists