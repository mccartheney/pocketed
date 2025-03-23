import userType from "@/types/userType"
import { useEffect, useState } from "react"
import { useUser } from "@/context/userContext"
import cardType from "@/types/cardtype"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import FriendsHeaderCreator from "./friendsHeaderCreator"
import FriendsHeaderFriend from "./friendsHeaderFriend"
import LoadingFriends from "./loadingFriends"
import NoFriends from "./noFriends"
import SharedFriends from "./sharedFriends"
import UnconnectedFriends from "./unconnectedFriends"
import NoHaveMoreFriends from "./noHaveMoreFriends"

type connectedFriendExtructure = {
    name : string,
    imgUrl : string,
    email : string,
    isCreator : boolean,
    isUser : boolean,
    isUserCreator : boolean,
}

const CardFriends = ({ card }: { card: cardType }) => {

    // router tp redirect to cards page on disconnect from card
    const router = useRouter()

    // get user data
    const { user } = useUser()

    // states
    const [friends, setFriends] = useState<userType[]>(user?.friends || [])
    const [connectedFriends, setConnectedFriends] = useState<connectedFriendExtructure[]>([])
    const [unconnectedFriends, setUnconnectedFriends] = useState<userType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [friendsType, setFriendsType] = useState<"shared" | "unconnected">("shared")

    // get all user friends
    const handleGetFriends = async () => {
        const response = await axios.get(`/api/user`, {
            params: {
                email: user?.email,
                connection: "friends"
            }
        })
        setFriends(response.data.message)
        setLoading(false)
    }

    useEffect(function getAllUserFriends() {
        handleGetFriends()
    }, [])

    useEffect (function redirectUserIfNotCreator() {
        let isOwner = false
        card.owners.forEach((owner : userType) => {
            if (owner.email === user?.email) {
                isOwner = true
            }
        })
        if (!isOwner) {
            router.push(`/app/cards`)
        }
    }, [])

    // connect friend to card
    const connectFriend = async (friend : userType) => {
        // try add friend to card
        const response = await axios.put(`/api/card`, {
            email: user?.email,
            cardId: card.id,
            addOwner: friend.id
        })

        // if success add friend to card
        if (response.data.status == 200) {
            // create friend data and add to connected friends and remove from unconnected friends
            const friendData = {
                name: friend.name,
                imgUrl: friend.imgUrl!,
                email: friend.email,
                isCreator: friend.email == card.creator.email,
                isUser: friend.email == user?.email,
                isUserCreator: friend.email == user?.email && friend.email == card.creator.email,
            }
            setUnconnectedFriends(unconnectedFriends.filter((user : userType) => user.email != friend.email))
            setConnectedFriends([...connectedFriends, friendData])

            toast.success("Friend added to card")
        }else { // if error
            toast.error("Error adding friend to card")
        }
    }

    // disconnect friend from card
    const disconnectFriend = async (friend: connectedFriendExtructure) => {
        // find friend in friends list
        const selectedFriend : userType  = friends.find((user : userType) => user.email == friend.email)!

        // try remove friend from card
        const response = await axios.put(`/api/card`, {
            email: user?.email,
            cardId: card.id,
            removeOwner: selectedFriend.id
        })

        // if success remove friend from card
        if (response.data.status == 200) {
            // remove friend from connected friends and add to unconnected friends
            setConnectedFriends(connectedFriends.filter((user : connectedFriendExtructure) => user.email != friend.email))
            setUnconnectedFriends([...unconnectedFriends, selectedFriend])
            toast.success("Friend removed from card")
        }else { // if error
            toast.error("Error removing friend from card")
        }
    }

    // disconnect from card
    const handleDisconnect = async () => {
        // try remove user from card
        const response = await axios.put(`/api/card`, {
            email: user?.email,
            cardId: card.id,
            removeOwner: user?.id
        })

        // if success redirect to cards page
        if (response.data.status == 200) {
            toast.success("You have disconnected from this card")
            router.push(`/app/cards`)
        } else { // if error
            toast.error("Error disconnecting from card")
        }
    }

    // function to organize friends
    useEffect(function organizeFriends() {        

        // organize connected friends
        const allConnectedFriends : connectedFriendExtructure[] = []
        card.owners.forEach((friend : userType    ) => {
            const friendData = {
                name : friend.name,
                imgUrl : friend.imgUrl!,
                email : friend.email,
                isCreator : friend.email == card.creator.email,
                isUser : friend.email == user?.email,
                isUserCreator : friend.email == user?.email && friend.email == card.creator.email,
            }

            allConnectedFriends.push(friendData)
        })

        // organize not connected friends
        const allNotconnectedFriends : userType[] = []
        friends.forEach((friend : userType) => {
            if (!card.owners.some((owner : userType) => owner.email == friend.email)) {
                allNotconnectedFriends.push(friend)
            }
        })

        setConnectedFriends(allConnectedFriends)
        setUnconnectedFriends(allNotconnectedFriends)
    },[])

    if (loading) {
        return (
            <>
                <LoadingFriends />
            </>
        )
    }
    
    return (
        <div className="w-2/6 h-full bg-base-200 rounded-2xl p-3 flex flex-col">
            {/* header */}
            <div className="flex flex-row items-center justify-between mt-2">
                {(user?.email === card.creator.email ) && (
                    <FriendsHeaderCreator friendsType={friendsType} setFriendsType={setFriendsType} />
                )}

                {(user?.email !== card.creator.email ) && (
                    <FriendsHeaderFriend />
                )}
            </div>
            <div className="divider mb-0 mt-2"></div>

            {friends.length === 0 && (
                <NoFriends />
            )}

            {( friends.length > 0 && friendsType === "shared") && (
                <SharedFriends connectedFriends={connectedFriends} disconnectFriend={disconnectFriend} handleDisconnect={handleDisconnect} user={user!} card={card} />
            )}

            {(friendsType === "unconnected" && unconnectedFriends.length > 0) && (
                <UnconnectedFriends unconnectedFriends={unconnectedFriends} connectFriend={connectFriend} />
            )}

            {(friendsType === "unconnected" && unconnectedFriends.length === 0 && user?.friends!.length! > 0) && (
                <NoHaveMoreFriends />
            )}

        </div>
    )
}

export default CardFriends