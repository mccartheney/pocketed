import { useUser } from "@/context/userContext"
import { useEffect } from "react"
import axios from "axios"
import userType from "@/types/userType"
import { useState } from "react"
import toast from "react-hot-toast"
import AddedFriendsItem from "./AddedFriendsItem"
const AddedFriendsList = () => {
    const { user } = useUser()
    const [friends, setFriends] = useState<userType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(function getFriends() {
        const fetchFriends = async () => {
            const response = await axios.get(`/api/user?email=${user?.email}&connection=friends`)
            if (response.status == 200) {setFriends(response.data.message)}
            else toast.error(response.data.message)
            setIsLoading(false)
        }
        fetchFriends()

        window.addEventListener("userEvents", ((e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail?.userEventType === "getFriends") {
                fetchFriends()
            }
        }) as EventListener)

        return () => window.removeEventListener("userEvents", ((e: Event) => {}) as EventListener)
    }, [])

    if (isLoading) return <div className="skeleton h-32 w-full"></div>
    if (friends.length==0) return <div className="text-center text-2xl font-bold">You have no friends 😭</div>
    
    return (
        <ul className="list bg-base-100 rounded-box shadow-md overflow-y-scroll mt-2 h-[85%]">
            {friends.map((friend) => (
                <AddedFriendsItem key={friend.id} friend={friend} />
            ))}
        </ul>
    )
}

export default AddedFriendsList