"use client"

import { useEffect, useState, Dispatch, SetStateAction } from "react"

import userType from "@/types/userType"
import UserItem from "./UserListItem"
import axios from "axios"
import { useUser } from "@/context/userContext"

const UsersList = ({

    setUsers,
    users,
    setConstantsUsers
}: {
    setUsers: Dispatch<SetStateAction<userType[]>>
    users: userType[]
    setConstantsUsers: Dispatch<SetStateAction<userType[]>>
}) => {
    // get the user
    const {user} = useUser()

    // define the state
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(function getPersons() {
        // function to get the users
        const getUsers = async () => {
            // get the users
            const res = await axios.get("/api/user", {
                params: {email: user?.email, connection: "none"}
            });

            // update the users
            setUsers(res.data.message);
            setConstantsUsers(res.data.message);

            // end loading
            setIsLoading(false);
        };

        // get the users
        getUsers();

        // add the event listener
        window.addEventListener("userEvents", ((e: Event) => {
            // get the custom event
            const customEvent = e as CustomEvent;

            // if the event type is getUsers, get the users
            if (customEvent.detail?.userEventType === "getUsers") {
                getUsers();
            }
        }) as EventListener)

        return () => window.removeEventListener("userEvents", (() => {}) as EventListener)
    }, []);

    // if the users are loading, return the loading
    if (isLoading) {
        return (
            <div className="w-full h-[calc(100vh-250px)] skeleton">
            </div>
        )
    }

    // if the users are empty, return the empty users
    if (users.length == 0) {
        return (
            <div className="overflow-y-auto rounded-2xl flex items-center justify-center h-[calc(100vh-250px)]">
                <div className="flex flex-col items-center justify-center rounded-box p-4">
                    <h4 className="text-center text-2xl font-bold ">No users found to add 😔</h4>
                    <p className="text-center  mt-2">Try refreshing or inviting new users!</p>
                </div>
            </div>
        )
    }

    // return the users list
    return (
        <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
            <ul className="list bg-base-100 rounded-box shadow-md">
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