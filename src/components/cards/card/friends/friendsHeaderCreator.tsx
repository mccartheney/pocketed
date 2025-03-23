import { SetStateAction } from "react"

const FriendsHeaderCreator = (
    { friendsType, setFriendsType }: 
    { friendsType: "shared" | "unconnected", setFriendsType: (value: SetStateAction<"shared" | "unconnected">) => void }
) => {
    return (
        <>
            <div className={`w-1/2 flex flex-row items-center justify-center text-sm cursor-pointer ${friendsType === "shared" ? "text-primary" : "text-base-content"}`} onClick={() => setFriendsType("shared")}>connected friends</div>
            <div className="divider z-10 divider-horizontal" />
            <div className={`w-1/2 flex flex-row items-center justify-center text-sm cursor-pointer ${friendsType === "unconnected" ? "text-primary" : "text-base-content"}`} onClick={() => setFriendsType("unconnected")}>Unconnected friends</div>
        </>
    )
}

export default FriendsHeaderCreator