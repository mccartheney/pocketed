import { useUser } from "@/context/userContext"
import axios from "axios"
import toast from "react-hot-toast"
import { signOut } from "next-auth/react"

const DeleteAccountModal = () => {
    // get the user
    const { user } = useUser()

    // method to delete the account
    const handleDeleteAccount = async () => {
        // delete the account
        const response = await axios.delete("/api/user", {
            params: { email: user!.email }
        });

        // if the account is deleted successfully
        if (response.data.status === 200) {
            // show the success message and sign out
            toast.success(response.data.message)
            signOut()
        } else {
            // show the error message
            toast.error(response.data.message)
        }
    }

    // return the delete account modal
    return (
        <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete Account</h3>
                <p className="py-4">Are you sure you want to delete your account? This action is irreversible.</p>
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