import { motion } from "framer-motion"
import { signOut } from "next-auth/react"
import { FiLogOut, FiTrash2 } from "react-icons/fi"

const ProfileActions = () => {
    // return the profile actions
    return (
        <div className="px-3 mt-3">
            <div className="flex flex-col gap-4">
                <motion.h1 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="text-2xl font-bold px-2"
                >
                    Account Actions
                </motion.h1>

                <div className=" flex">
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        onClick={() => signOut()}
                        className="btn btn-warning flex gap-2 mr-3"
                    >
                        <FiLogOut size={18} />
                        Sign Out
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="btn btn-error"
                        onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}
                    >
                        <FiTrash2 size={18} />
                        Delete Account
                    </motion.button>
                </div>
            </div>
            <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="divider my-3"
            />
        </div>
    )
}

export default ProfileActions