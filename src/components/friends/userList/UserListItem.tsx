import { PiPlus } from "react-icons/pi"
import userType from "@/types/userType"
import Image from "next/image"
import { useUser } from "@/context/userContext"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import LoadingBtnContent from "@/components/LoadingBtnContent"
import usersEvents from "@/customEvents/usersEvents"

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
    const btnRef = useRef<HTMLButtonElement>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleAddFriend = async () => {
        setIsLoading(true)
        btnRef.current!.disabled = true;
        
        axios.put("/api/user", {
            email: user?.email,
            addFriend: {
                userSendingRequest: user,
                userReceivingRequest: userLi
            }
        }).then((res) => {
            if (res.status == 200) {
                toast.success("Friend added")
                setUsers(prev => prev.filter(userToRm => userToRm.email !== userLi.email))
                window.dispatchEvent(usersEvents("getFriends"))
            }else {
                toast.error(res.data.message)
                setIsLoading(false)
                btnRef.current!.disabled = false;
            }
        })
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
            <button className="btn btn-square btn-ghost" ref={btnRef} onClick={() => handleAddFriend()}>
                {isLoading ? <LoadingBtnContent/> : <PiPlus/>}
            </button>
            
        </li>
    )
}

export default UserItem