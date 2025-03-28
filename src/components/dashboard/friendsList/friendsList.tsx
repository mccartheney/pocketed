import { motion } from "framer-motion";
import  cardType from "@/types/cardtype";
import FriendsListHeader from "./friendsListHeader";
import { useUser } from "@/context/userContext";
const FriendsList = ({allCards}: {allCards: cardType[]}) => {

    const { user } = useUser();


    if (allCards.length === 0) {
        return (
            <div className="w-full lg:w-1/2 mt-3 lg:mt-0  h-full bg-base-200 rounded-2xl p-3">
            </div>
        )
    }
    
    return (
        <div className="w-full lg:w-1/2 mt-3 lg:mt-0  h-full bg-base-200 rounded-2xl p-3">
            <FriendsListHeader />
            
            {
                user?.friends.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full mt-[-20px] flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold">No friends yet 😔,</h2>
                        <p className="text-sm">Add friends to see their card</p>
                    </motion.div>
                ) 
            }

            {
                user?.friends.length! > 0 && (
                    <ul className="list bg-base-100 rounded-box shadow-md max-h-[300px] overflow-y-auto">
                        {user?.friends.map((friend) => (
                            <li className="list-row" key={friend.id}>
                                <div><img className="size-10 rounded-box" src={friend.imgUrl!} /></div>
                                <div>{friend.name}</div>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}      

export default FriendsList;