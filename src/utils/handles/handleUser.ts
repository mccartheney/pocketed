import { PrismaClient } from "@prisma/client";
import CheckUserExists from "../reusable_functions/checkUserExists";
import userType from "@/types/userType";

//  init prisma client
const prisma = new PrismaClient()

class HandleUser {
    
    // method to create user
    async createUser(
        name: string, email: string, imgUrl: string
    ) {
        // check if user exists
        const userExists = await CheckUserExists(email)

        if (!userExists) {
            // create user
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
            
            // return user
            return user
        }
        
        // if user exists, return null
        return null
    }
        
    // method to get user   
    async getUser(email: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // if user dont exists, return null
        if (!user) {
            return null
        }

        // return user
        return user
    }

    // method to get all users
    async getAllUsers() {
        // get all users
        const users= await prisma.user.findMany()

        // return users
        return users
    }

    // method to update user
    async updateUser(
        email: string, updateKey: "name" | "email" | "imgUrl", keyValue: string
    ) {
        // check if user exists
        const user = await CheckUserExists(email)

        // if user dont exists, return null
        if (!user) {
            return null
        }

        // update user
        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { [updateKey]: keyValue }
        })

        // return updated user
        return updatedUser
    }

    // method to delete user
    async deleteUser(email: string) {
        // check if user exists
        const user= await CheckUserExists(email)

        // if user dont exists, return null
        if (!user) {
            return null
        }

        // delete user
        await prisma.user.delete({
            where: { email: email }
        })

        // return user
        return user
    }

    // method to get friends        
    async getFriends(email: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // if user dont exists, return null
        if (!user) {
            return null
        }

        // return friends
        return user.friends
    }

    // method to add friend
    async addFriend(email: string, friendEmail: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // check if friend exists
        const friend = await CheckUserExists(friendEmail)

        // if user or friend to add dont exists, return null
        if (!user || !friend) {
            return null
        }

        // check if user is already friend
        const isFriend = user.friends.some(friendParam => friendParam.email === friendEmail)

        // if user is already friend, return null
        if (isFriend) {
            return null
        }

        // add friend
        await prisma.user.update({
            where: { email: email },
            data: { friends: { connect: { email: friendEmail } } }
        })

        // return user
        return user
    }

    // method to delete friend
    async deleteFriend(email: string, friendEmail: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // check if friend exists
        const friend = await CheckUserExists(friendEmail)

        // if user or friend to delete dont exists, return null
        if (!user || !friend) {
            return null
        }

        // delete friend
        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { friends: { disconnect: { email: friendEmail } } }
        })

        // return updated user
        return updatedUser
    }

    // method to get cards      
    async getCards (email : string) {
        // check if user exists
        const user  = await CheckUserExists(email)

        // if user dont exists, return null
        if (! user) {
            return null
        }

        return user.cards
    }

    // method to change theme
    async changeTheme(email : string, theme : string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // if user dont exists, return null
        if (! user) {
            return null
        }   

        // change theme
        await prisma.user.update({
            where : { email : email },
            data : { theme : theme }
        })

        // return user
        return user        
    }
}

export default HandleUser