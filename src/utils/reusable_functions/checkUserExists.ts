import userType from "@/types/userType";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const CheckUserExists = async (email: string): Promise<userType | null> =>  {
    const user : userType = await prisma.user.findFirst({
        where: { email: email }       
    })

    return user
}

export default CheckUserExists;