"use client"
import { useUser } from "@/context/userContext"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import userType from "@/types/userType"
import axios from "axios"
import toast from "react-hot-toast"
import { FaTrash } from "react-icons/fa"
import Image from "next/image"
import AddedFriendsTitle from "./AddedFriendsTitle"
import AddedFriendsList from "./AddedFriendsList"


const AddedFriends = () => {

    return (
        <div className=" w-full h-3/5 bg-base-200 p-3 rounded-2xl">
            <AddedFriendsTitle />
            <AddedFriendsList />
        </div>
    )
}

export default AddedFriends