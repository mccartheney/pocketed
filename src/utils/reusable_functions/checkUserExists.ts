import { PrismaClient } from "@prisma/client"

//  init prisma client
const prisma = new PrismaClient()

//  check if user exists
async function CheckUserExists(email: string) {

    // get user from database
    const user = await prisma.user.findFirst({
        where: { email: email },
        include: {
            friends: true,
            friendOf: true,
            cards: true
        }
    })

    await prisma.$disconnect()
    // return user
    return user
}

export default CheckUserExists