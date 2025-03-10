import { PrismaClient } from "@prisma/client";
import CheckUserExists from "../reusable_functions/checkUserExists";
import userType from "@/types/userType";

const prisma = new PrismaClient()

class HandleUser {
    async createUser(
        name: string, email: string, imgUrl: string
    ) {
        const userExists = await CheckUserExists(email)

        if (!userExists) {
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    imgUrl: imgUrl,
                    authMethod: "email",
                    theme: "dark"
                },
                include: {
                    friends: true,
                    friendOf: true,
                    cards: true
                }
            })

            return user
        }

        return null
    }
        
    async getUser(email: string) {
        const user = await CheckUserExists(email)

        if (!user) {
            return null
        }

        return user
    }

    async getAllUsers() {
        const users= await prisma.user.findMany()

        return users
    }

    async updateUser(
        email: string, updateKey: "name" | "email" | "imgUrl", keyValue: string
    ) {
        const user = await CheckUserExists(email)

        if (!user) {
            return null
        }

        await prisma.user.update({
            where: { email: email },
            data: { [updateKey]: keyValue }
        })

        return user
    }

    async deleteUser(email: string) {
        const user= await CheckUserExists(email)

        if (!user) {
            return null
        }

        await prisma.user.delete({
            where: { email: email }
        })

        return user
    }


    async getFriends(email: string) {
        const user = await CheckUserExists(email)

        if (!user) {
            return null
        }

        return user.friends
    }

    async addFriend(email: string, friendEmail: string) {
        const user = await CheckUserExists(email)
        const friend = await CheckUserExists(friendEmail)

        if (!user || !friend) {
            return null
        }

        const isFriend = user.friends.some(friendParam => friendParam.email === friendEmail)

        if (isFriend) {
            return null
        }

        await prisma.user.update({
            where: { email: email },
            data: { friends: { connect: { email: friendEmail } } }
        })

        return user
    }
    
    async deleteFriend(email: string, friendEmail: string) {
        const user = await CheckUserExists(email)
        const friend = await CheckUserExists(friendEmail)

        if (!user || !friend) {
            return null
        }

        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { friends: { disconnect: { email: friendEmail } } }
        })

        return updatedUser
    }
    
    async getCards (email : string) {
        const user  = await CheckUserExists(email)

        if (! user) {
            return null
        }

        return user.cards
    }

    async changeTheme(email : string, theme : string) {
        const user = await CheckUserExists(email)

        if (! user) {
            return null
        }   

        await prisma.user.update({
            where : { email : email },
            data : { theme : theme }
        })

        return user        
    }
}

export default HandleUser