import { useUser } from "@/context/userContext"
import { useEffect } from "react"
import axios from "axios"
import userType from "@/types/userType"
import { useState } from "react"
import toast from "react-hot-toast"
import AddedFriendsItem from "./AddedFriendsItem"
const AddedFriendsList = () => {
    // define the user
    const { user } = useUser()

    // define the state
    const [friends, setFriends] = useState<userType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // method to get the friends
    useEffect(function getFriends() {
        // method to get the friends
        const fetchFriends = async () => {
            // get the friends
            const response = await axios.get(`/api/user?email=${user?.email}&connection=friends`)

            // if the friends are fetched successfully
            // update the friends
            if (response.status == 200) {setFriends(response.data.message)}
            // show the error message
            else toast.error(response.data.message)

            // end loading
            setIsLoading(false)
        }

        // get the friends
        fetchFriends()

        // add the event listener
        window.addEventListener("userEvents", ((e: Event) => {
            // get the custom event
            const customEvent = e as CustomEvent;

            // if the event type is getFriends, get the friends
            if (customEvent.detail?.userEventType === "getFriends") {
                fetchFriends()
            }
        }) as EventListener)

        // return the event listener
        return () => window.removeEventListener("userEvents", (() => {}) as EventListener)
    }, [])

    // if the friends are loading, return the loading
    if (isLoading) return <div className="flex skeleton flex-col gap-3  rounded-2xl p-3">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-3 p-3">
                <div className="flex flex-row items-center ">
                    <div className="animate-pulse bg-base-200 w-10 h-10 rounded-full"></div>
                    <div className="animate-pulse bg-base-200 w-[200px] h-6 flex-grow ml-2"></div>
                </div>
                <div className="animate-pulse bg-base-200 w-8 h-8 rounded-xl">
                </div>
            </div>
        ))}
    </div>

    // if the friends are empty, return the empty friends
    if (friends.length == 0) return <div className="overflow-y-auto rounded-2xl flex items-center flex-col justify-center h-[calc(100vh-250px)]">
                                        <h4 className="text-center text-2xl font-bold">You have no friends 😭</h4>
                                        <p className="text-center mt-2">
                                            Try adding some friends to your list!
                                        </p>
                                    </div>

    // return the added friends list
    return (
        <ul className="list bg-base-100 rounded-box shadow-md overflow-y-scroll mt-2 max-h-[85%]">
            {friends.map((friend) => (
                <AddedFriendsItem key={friend.id} friend={friend} />
            ))}
        </ul>
    )
}

export default AddedFriendsList