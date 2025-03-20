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
    // define the user
    const {user} = useUser()

    // define the state
    const [isLoading, setIsLoading] = useState(false)

    // method to delete the friend
    const handleDeleteFriend = async () => {
        // start loading
        setIsLoading(true)

        // delete the friend
        const response = await axios.put("/api/user", {
            email: friend.email,
            deleteFriend: {
                userEmail: user?.email!,
                friendEmail: friend.email
            }
        })

        // if the friend is deleted successfully
        if (response.status == 200) {
            // show the success message and reload the friends and users
            toast.success(response.data.message)
            window.dispatchEvent(usersEvents("getFriends"))
            window.dispatchEvent(usersEvents("getUsers"))
        } else {
            // show the error message
            toast.error(response.data.message)
        }

        // end loading
        setIsLoading(false)

    }

    // return the added friends item
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