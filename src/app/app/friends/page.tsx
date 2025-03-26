"use client"
import AddedFriends from "@/components/friends/addedFriends/AddedFriends"
import UsersListHeader from "@/components/friends/userList/UsersListHeader"
import UsersList from "@/components/friends/userList/UsersList"
import { useRef, useState } from "react"
import userType from "@/types/userType"

const Page = () => {
    // define state
    const userSearchRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const [users, setUsers] = useState<userType[]>([])
    const [constantsUsers, setConstantsUsers] = useState<userType[]>([])

    // return the friends page
    return (
        <div className="h-full p-4 flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/3 lg:flex-shrink-0">
                <AddedFriends />
            </div>
            <div className="bg-base-200 w-full lg:w-2/3 lg:flex-grow p-3 rounded-2xl">
                <UsersListHeader
                    userSearchRef={userSearchRef}
                    setUsers={setUsers}
                    constantsUsers={constantsUsers}
                />
                <UsersList
                    setUsers={setUsers}
                    users={users}
                    setConstantsUsers={setConstantsUsers}
                />
            </div>
        </div>     
    )
}

export default Page