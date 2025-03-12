import { PiPlus } from "react-icons/pi"
import userType from "@/types/userType"
import Image from "next/image"
import { useUser } from "@/context/userContext"
import { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const UserItem = (
    {
        userLi,
        setUsers
    }: {
        userLi: userType
        setUsers: Dispatch<SetStateAction<userType[]>>
    }
) => {
    const {user} = useUser()
    

    const handleAddFriend = async () => {
        
    }

    return (
        <li className="list-row">
            <div className="w-10 h-10 rounded-full">
                <Image width={40} height={40} src={userLi.imgUrl!} alt={userLi.name!} className="rounded-full" />
                
            </div>
            <div>
                <div>{userLi.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{userLi.email}</div>
            </div>
            <button className="btn btn-square btn-ghost" onClick={() => handleAddFriend()}>
                <PiPlus/>
            </button>
            
        </li>
    )
}

export default UserItem