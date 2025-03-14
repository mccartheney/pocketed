"use client"

import { BiDotsHorizontal } from "react-icons/bi"
import userType from "@/types/userType"
import { Dispatch, SetStateAction, useEffect } from "react"
const UsersListHeader = (
    {
        userSearchRef,
        setUsers,
        constantsUsers
    }: {
        userSearchRef: React.RefObject<HTMLInputElement> | null,
        setUsers: Dispatch<SetStateAction<userType[]>>,
        constantsUsers: userType[]
    }
) => {



    const handleSearch = () => {
        const searchUserValue = userSearchRef!.current?.value
        const filteredUsers = constantsUsers.filter((user) => user.name!.toLowerCase().includes(searchUserValue!.toLowerCase()))
        setUsers(filteredUsers)
    }

    return (
        <>
            <div className="header-container flex flex-col md:flex-row items-center justify-between">
                <div className="title flex items-center justify-between w-full md:w-auto">
                    <h3 className="text-2xl font-bold">
                        Users
                    </h3>
                </div>
                <label className="floating-label mt-3 w-full md:w-auto md:ml-4">
                    <span>User name</span>
                    <input type="text" ref={userSearchRef} onChange={() => handleSearch()} placeholder="User name" className="input input-md" />
                </label>
            </div>
            <div className="divider "></div>
        </>
    )
}

export default UsersListHeader