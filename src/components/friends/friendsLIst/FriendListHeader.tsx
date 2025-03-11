import { BiDotsHorizontal } from "react-icons/bi"

const FriendListHeader = () => {
    return (
        <>
            <div className="title flex items-center justify-between">
                <h3 className="text-xl font-bold">
                    Persons
                </h3>
                <button className="btn btn-primary btn-xs text-xl">
                    <BiDotsHorizontal />
                </button>
            </div>

            <label className="floating-label my-3">
                <span>User name</span>
                <input type="text" placeholder="User name" className="input input-md" />
            </label>
        </>
    )
}

export default FriendListHeader