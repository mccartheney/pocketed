import { signOut } from "next-auth/react"
import { FiLogOut, FiTrash2 } from "react-icons/fi"

const ProfileActions = () => {
    return (
        <div className="p-3">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold px-2">Account Actions</h1>

                <div className=" flex">
                    <button
                        onClick={() => signOut()}
                        className="btn btn-warning flex gap-2 mr-3"
                    >
                        <FiLogOut size={18} />
                        Sign Out
                    </button>

                    <button
                        className="btn btn-error"
                        onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}
                    >
                        <FiTrash2 size={18} />
                        Delete Account
                    </button>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default ProfileActions