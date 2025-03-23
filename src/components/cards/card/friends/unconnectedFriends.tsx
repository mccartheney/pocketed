import userType from "@/types/userType"
import { LuPlus } from "react-icons/lu"

const UnconnectedFriends = (
    { unconnectedFriends, connectFriend }: 
    { unconnectedFriends: userType[], connectFriend: (friend: userType) => void }
) => {
    return (
        <ul className="list bg-base-100 mt-2 rounded-box shadow-md max-h-[full] overflow-y-scroll">
            {unconnectedFriends.map((friend: userType) => (
                <li className="list-row" key={friend.id}>
                    <div><img className="size-10 rounded-box" src={friend.imgUrl!} /></div>
                    <div>
                        <div>{friend.name}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{friend.email}</div>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <button className="btn btn-square btn-ghost  text-primary">
                            <LuPlus onClick={() => connectFriend(friend)} />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default UnconnectedFriends