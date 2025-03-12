
import { BiDotsHorizontal } from "react-icons/bi"

const UsersListHeader = () => {
    return (
        <>
            <div className="header-container flex flex-col md:flex-row items-center justify-between">
                <div className="title flex items-center justify-between w-full md:w-auto">
                    <h3 className="text-2xl font-bold">
                        Users
                    </h3>
                    <button className="btn btn-primary btn-xs text-xl ml-2">
                        <BiDotsHorizontal />
                    </button>
                </div>
                <label className="floating-label mt-3 w-full md:w-auto md:ml-4">
                    <span>User name</span>
                    <input type="text" placeholder="User name" className="input input-md" />
                </label>
            </div>
            <div className="divider "></div>
        </>
    )
}

export default UsersListHeader