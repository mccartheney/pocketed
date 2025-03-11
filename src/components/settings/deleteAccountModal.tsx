import { useUser } from "@/context/userContext"
import axios from "axios"
import toast from "react-hot-toast"
import { signOut } from "next-auth/react"

const DeleteAccountModal = () => {

    const { user } = useUser()

    const handleDeleteAccount = async () => {
        const response = await axios.delete("/api/user", {
            params: { email: user!.email }
        });

        if (response.data.status === 200) {
            toast.success(response.data.message)
            signOut()
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                <form method="dialog">
                        <button className="btn btn-error mr-3" onClick={() => { handleDeleteAccount() }}>Delete Account</button>
                        <button className="btn" >Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteAccountModal