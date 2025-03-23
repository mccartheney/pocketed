import cardType from "@/types/cardtype"
import userType from "@/types/userType"
import { BiExit } from "react-icons/bi"
import { CgRemove } from "react-icons/cg"
import { LuCrown } from "react-icons/lu"

type connectedFriendExtructure = {
    name: string,
    imgUrl: string,
    email: string,
    isCreator: boolean,
    isUser: boolean,
    isUserCreator: boolean,
}

// todo : add a loading state to a button

const SharedFriends = (
    { connectedFriends, disconnectFriend, handleDisconnect, user, card }: 
    { connectedFriends: connectedFriendExtructure[], disconnectFriend: (friend: connectedFriendExtructure) => void, handleDisconnect: () => void, user: userType, card: cardType }) => {
    return (
        <ul className="list bg-base-100 mt-2 rounded-box shadow-md max-h-[full] overflow-y-scroll">
            {connectedFriends.map((friend: connectedFriendExtructure) => (
                <li className="list-row" key={friend.email}>
                    <div><img className="size-10 rounded-box" src={friend.imgUrl} /></div>
                    <div>
                        <div>{friend.name}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{friend.email}</div>
                    </div>
                    {friend.isCreator && <div className="text-xl text-primary uppercase font-semibold flex items-center justify-center rounded-full p-2 "><LuCrown /></div>}
                    {(user?.email == card.creator.email && !friend.isCreator) && <div className="mr-[-17px]"><button className="text-xl btn  btn-ghost flex items-center justify-center  p-2 text-error"><CgRemove onClick={() => disconnectFriend(friend)} /></button></div>}
                    {(!friend.isUserCreator && !friend.isCreator && friend.isUser) && <div><button className="text-xl btn  btn-ghost flex items-center justify-center  p-2 text-error" onClick={() => handleDisconnect()}><BiExit /></button></div>}
                    {(!friend.isUserCreator && !friend.isCreator && !friend.isUser) && <div></div>}
                </li>
            ))}
        </ul>
    )
}

export default SharedFriends