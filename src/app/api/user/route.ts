import HandleUser from "@/utils/handles/handleUser"
import { NextRequest, NextResponse } from "next/server"
import userType from "@/types/userType"

// method to get a user
const GET = async (req:NextRequest) => {
    // get necessary parameters
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const handleUser = new HandleUser()
    const connection = searchParams.get("connection")

    // if user dont want to get a specific user, get all users
    if (!email) {
        // get all users and return them
        const users = await handleUser.getAllUsers()
        return NextResponse.json({ message: users })
    }

    // if user want to get users without connection with him, get them
    if (connection == "none") {
        // get users without connection with him and return them
        const users = await handleUser.usersWithoutConnectionWithUser(email)
        return NextResponse.json({ message: users })
    }

    // if user want to get his friends, get them
    if (connection == "friends") {
        try {
            // get friends and return them
            const users = await handleUser.getFriends(email)
            return NextResponse.json({ message: users })
        } catch (error) {
            // if error getting friends, return 500
            return NextResponse.json({ status: 500, message: "Error getting friends", error })
        }
    }

    // get user and return him
    const user = await handleUser.getUser(email)
    return NextResponse.json({ message: user })
}

// method to update a user
const PUT = async (req:NextRequest) => {
    // get necessary parameters
    const { updateKey, keyValue, email, addFriend, deleteFriend} 
    : {
        updateKey: "name" | "email" | "imgUrl",
        keyValue: string,
        email: string,
        addFriend: {
            userSendingRequest: userType,
            userReceivingRequest: userType
        },
        deleteFriend: {
            userEmail: string,
            friendEmail: string
        }
    } = await req.json()

    // if user dont want to update a user, return 400
    if (!email) return NextResponse.json({status: 400, message: "Email is required"})
    
    // update the user
    const handleUser = new HandleUser()
    const user = await handleUser.getUser(email)
    // if user not found, return 404
    if (!user) return NextResponse.json({status: 404, message: "User not found"})

    if (updateKey && keyValue) {
        const UpdatedUser = await handleUser.updateUser(email, updateKey, keyValue)
        return NextResponse.json({ status: 200, message: "User updated", UUser: UpdatedUser })
    }

    // if user want to add a friend
    if(addFriend) {
        // add the friend
        try {
            // add the friend and return the friend added
            await handleUser.addFriend(addFriend.userSendingRequest.email, addFriend.userReceivingRequest.email)
            return NextResponse.json({status: 200, message: "Friend added"})
        } catch (error) {
            // if error adding friend, return 500
            return NextResponse.json({status: 500, message: "Error adding friend", error})
        }
    }

    // if user want to delete a friend
    if (deleteFriend) {
        try {
            // delete the friend and return the friend deleted
            const deletedFriend = await handleUser.deleteFriend(deleteFriend.userEmail, deleteFriend.friendEmail)
            return NextResponse.json({status: 200, message: "Friend deleted", deletedFriend})
        } catch (error) {
            // if error deleting friend, return 500 
            return NextResponse.json({status: 500, message: "Error deleting friend", error})
        }
    }

    // if user want to remove the user image
    if (!updateKey || !keyValue) {
        // update the user image and return the user updated
        const avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzkqmu8RTm0bAg4s0ShPQzvDuTlRzQB1kaQ&s"
        const userWithOutImg = await handleUser.updateUser(email, "imgUrl", avatar)

        return NextResponse.json({ status: 200, message: "User image removed", UUser: userWithOutImg })
    }

    // return error
    return NextResponse.json({status: 400, message: "Invalid request"})
}

// method to delete a user
const DELETE = async (req:NextRequest) => {
    // get necessary parameters
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    // if user dont want to delete a user, return 400
    if (!email) return NextResponse.json({status: 400, message: "Email is required"})

    // delete the user
    const handleUser = new HandleUser()
    const user = await handleUser.deleteUser(email)

    // if user not found, return 404
    if (!user) return NextResponse.json({status: 404, message: "User not found"})

    // return the user deleted
    return NextResponse.json({status: 200, message: "User deleted", UUser: user})
    
}
export { GET, PUT, DELETE }