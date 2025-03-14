"use client"

import AddedFriendsTitle from "./AddedFriendsTitle"
import AddedFriendsList from "./AddedFriendsList"


const AddedFriends = () => {

    return (
        <div className=" w-full h-3/5 bg-base-200 p-3 rounded-2xl">
            <AddedFriendsTitle />
            <AddedFriendsList />
        </div>
    )
}

export default AddedFriends