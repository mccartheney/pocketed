"use client"

import { useEffect, useState } from "react"

import userType from "@/types/userType"
import UserItem from "./UserListItem"
import axios from "axios"
import { useUser } from "@/context/userContext"

const UsersList = () => {

    const {user} = useUser()
    const [users, setUsers] = useState<userType[]>([])

    console.log(user)

    useEffect(function getPersons() {
        axios.get("/api/user", {params: {email: user?.email, connection: "none"}}).then((res) => {
            setUsers(res.data.message)
        })
    }, [])

    if (users.length == 0) {
        return (
            <div className="overflow-y-auto rounded-2xl max-h-[calc(100vh-250px)]">
                <div className=" bg-base-100 h-40 flex items-center justify-center rounded-box shadow-md ">
                    <h4 className="text-center text-2xl font-bold">No users to add, cry !</h4>
                </div>
            </div>
        )
    }

    return (
        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
            <ul className="list bg-base-100 rounded-box shadow-md ">
                {
                    users.map((user) => (
                        <UserItem key={user.email} userLi={user} setUsers={setUsers} />
                    ))
                }
            </ul>
        </div>
    )
}

export default UsersList