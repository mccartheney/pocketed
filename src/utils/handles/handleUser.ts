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

        await prisma.$disconnect()
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
        const users= await prisma.user.findMany({
            include : {
                friends: true,
                friendOf: true
            }
        })

        await prisma.$disconnect()
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

        await prisma.$disconnect()
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

        await prisma.$disconnect()
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

        await prisma.$disconnect()
        // return user
        return user
    }

    async sendFriendRequest(email: string, friendEmail: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // check if friend exists
        const friend = await CheckUserExists(friendEmail)

        // if user or friend to send request dont exists, return null
        if (!user || !friend) {
            return "user or friend dont exists"
        }

        // check if user is already friend
        const isFriend = user.friends.some(friendParam => friendParam.email === friendEmail)

        const isFriendRequest = user.friendOf.some(friendParam => friendParam.email === friendEmail)

        // if user is already friend, return null
        if (isFriend || isFriendRequest) {
            return "User already friend or request already sent"
        }

        // send friend request
        await prisma.user.update({
            where: { email: friendEmail },
            data: { friendOf: { connect: { email: friendEmail } } }
        })

        // add friend to user
        await prisma.user.update({
            where: { email: email },
            data: { friends: { connect: { email: friendEmail } } }
        })

        await prisma.$disconnect()
        // return user
        return "Friend request sent"
    }

    async usersWithoutConnectionWithUser (email: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // if user dont exists, return null
        if (!user) {
            return null
        }

        // get users that are not in user.friends or user.friendOf
        const users = await this.getAllUsers()

        const filteredUsers = users.filter((userElement) => {
            const isFriend = userElement.friends.some(person => person.email === user.email);
            const isFriendOf = userElement.friendOf.some(person => person.email === user.email);
            const isMe = userElement.email === user.email;
            return !(isFriend || isFriendOf || isMe);
        });


        await prisma.$disconnect()
        // return users
        return filteredUsers
    }

    async getFriendRequests(email: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // if user dont exists, return null
        if (!user) {
            return null
        }

        // return friend requests
        return user.friendOf
    }
    

    async acceptFriendRequest(email: string, friendEmail: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // check if friend exists
        const friend = await CheckUserExists(friendEmail)

        // if user or friend to accept request dont exists, return null
        if (!user || !friend) {
            return null
        }

        // check if user is already friend
        const isFriend = user.friends.some(friendParam => friendParam.email === friendEmail)

        const isFriendRequest = user.friendOf.some(friendParam => friendParam.email === friendEmail)

        // if user is already friend, return null
        if (isFriend || isFriendRequest) {
            return null
        }

        // accept friend request
        await prisma.user.update({
            where: { email: email },
            data: { friends: { connect: { email: friendEmail } } }
        })

        await prisma.$disconnect()
        // return user
        return "Friend request accepted"
    }

    async rejectFriendRequest(email: string, friendEmail: string) {
        // check if user exists
        const user = await CheckUserExists(email)

        // check if friend exists
        const friend = await CheckUserExists(friendEmail)

        // if user or friend to reject request dont exists, return null
        if (!user || !friend) {
            return null
        }

        // check if user is already friend
        const isFriend = user.friends.some(friendParam => friendParam.email === friendEmail)

        const isFriendRequest = user.friendOf.some(friendParam => friendParam.email === friendEmail)

        // if user is already friend, return null
        if (isFriend || isFriendRequest) {
            return null
        }

        // reject friend request
        await prisma.user.update({
            where: { email: email },
            data: { friendOf: { disconnect: { email: friendEmail } } }
        })

        await prisma.$disconnect()
        // return user
        return "Friend request rejected"
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

        await prisma.$disconnect()
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

        await prisma.$disconnect()

        // return user
        return user        
    }
}

export default HandleUser