import userType from "@/types/userType"
import { FaTrash } from "react-icons/fa"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import LoadingBtnContent from "@/components/LoadingBtnContent"
import { useUser } from "@/context/userContext"
import usersEvents from "@/customEvents/usersEvents"

const AddedFriendsItem = (
    { friend }: { friend: userType }
) => {
    const {user} = useUser()

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteFriend = async () => {
        setIsLoading(true)
        const response = await axios.put("/api/user", {
            email: friend.email,
            deleteFriend: {
                userEmail: user?.email!,
                friendEmail: friend.email
            }
        })
        if (response.status == 200) {
            toast.success(response.data.message)
            window.dispatchEvent(usersEvents("getFriends"))
            window.dispatchEvent(usersEvents("getUsers"))
        } else {
            toast.error(response.data.message)
        }
        setIsLoading(false)
    }

    return (
        <li className="list-row">
            <div className="w-10 h-10 rounded-full">
                <Image width={40} height={40} src={friend.imgUrl!} alt={friend.name!} className="rounded-full" />
            </div>
            <div>
                <div>{friend.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{friend.email}</div>
            </div>
            <button className="btn btn-error" onClick={() => handleDeleteFriend()} disabled={isLoading}>
                {isLoading ? <LoadingBtnContent /> : <FaTrash />}
            </button>
        </li>
    )
}
export default AddedFriendsItem