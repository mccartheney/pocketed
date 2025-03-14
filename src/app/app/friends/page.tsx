
import AddedFriends from "@/components/friends/addedFriends/AddedFriends"
import FriendListHeader from "@/components/friends/userList/UsersListHeader"
import FriendsList from "@/components/friends/userList/UsersList"

const Page = () => {
    return (
        <div className="h-full p-4 flex flex-col md:flex-row">
            <div className="flex h-full  w-full md:w-1/3 md:pr-3 md: flex-col ">
                <AddedFriends />
            </div>
            <div className="bg-base-200 h-full p-3 w-full md:w-2/3 rounded-2xl">
                <FriendListHeader/>
                <FriendsList />
            </div>
        </div>
        
    )
}

export default Page