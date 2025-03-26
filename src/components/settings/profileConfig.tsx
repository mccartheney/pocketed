"use client"
import { FaEdit, FaCamera, FaTrash } from "react-icons/fa";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import LoadingPage from "../LoadingPage";
import toast from "react-hot-toast";
import NewProfilePicModel from "./newProfilePicModal";
import {useUser} from "@/context/userContext"
import { motion } from "framer-motion"

const ProfileConfig = () => {
    // get user and set user
    const { user, setUser } = useUser();

    // state for active editing
    const [editing, setEditing] = useState <boolean>(false)
    // ref for user name input
    const userNameInputRef = useRef<HTMLInputElement | null>(null)

    // if the user is not loaded, return the loading page
    if (!user) return <LoadingPage/>

    // method to delete the profile picture
    const handleDeleteProfilePic = async () => {
        try {
            // delete the profile picture
            const response = await axios.put("/api/user/", {
                email: user.email
            });

            // if the profile picture is deleted successfully
            if (response.data.status === 200) {
                // set the user and show the success message
                setUser(response.data.UUser);
                toast.success(response.data.message);
            } else {
                // show the error message
                toast.error(response.data.message);
            }
        } catch (error) {
            // show the error message
            toast.error("Error deleting profile picture");
        }
    };

    // method to edit the user name
    const handleUserNameEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // get user name
        const userName = userNameInputRef.current?.value

        // if the user name is not valid, show the error message and set the editing to false
        if (!userName) {
            toast.error("Please enter a valid name")
            setEditing(false)
            // set the user name input value
            if (userNameInputRef.current) {
                userNameInputRef.current.value = user.name
            }
            return
        } 
        
        // try to update the user name
        try {
            // update the user name
            const response = await axios.put("/api/user/", {
                email: user.email,
                updateKey: "name",
                keyValue: userName
            })

            // if the user name is updated successfully
            if (response.data.status === 200) {
                // set the user and show the success message
                setUser(response.data.UUser)
                toast.success(response.data.message)
                setEditing(false)
                // set the user name input value
                if (userNameInputRef.current) {
                    userNameInputRef.current.value = userName
                }
            } else {
                // show the error message
                toast.error(response.data.message)
            }
        } catch (error) {
            // show the error message
            toast.error("Error updating name")
        }
    }

    // return the profile config
    return (
        <div className="p-3">
            <NewProfilePicModel/>
            <div className="p-2">

                <div className="profileImage flex items-center mb-8">
                    <div className="avatar relative">
                        <motion.div
                            transition={{ duration: 1 }}
                            className="w-32 h-32 rounded-full overflow-hidden border-4 border-text-primary shadow-lg flex justify-center items-center"
                        >
                            <img
                                src={user.imgUrl!} 
                                alt="Profile" 
                            />
                        </motion.div>
                        <motion.button
                            onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                            className="btn btn-xs btn-warning bottom-0 right-0 absolute h-min w-min p-2 rounded-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <FaCamera size={16} />
                        </motion.button>
                        <motion.button
                            onClick={() => {handleDeleteProfilePic()}}
                            className="btn btn-xs btn-error bottom-0 left-0 absolute h-min w-min p-2 rounded-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <FaTrash size={16} />
                        </motion.button>
                    </div>
                </div>

                <motion.div 
                    transition={{ duration: 1 }}
                    className="p-6 rounded-lg shadow-md bg-base-200"
                >
                    <div className="mb-6">
                        <motion.h2 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="text-xl font-semibold relative  mb-2"
                        >
                            User Name
                        </motion.h2>
                        <div className="flex items-center">
                            {editing ? 
                                <form className="mr-3" onSubmit={(e) => {handleUserNameEdit(e)}}>
                                    <motion.input
                                        type="text"
                                        placeholder="User name"
                                        defaultValue={user.name}
                                        ref = {userNameInputRef}
                                        className="input input-bordered input-primary w-full max-w-xs"
                                    />
                                    < button hidden type="submit"/>
                                </form>
                                    :
                                <motion.input
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    type="text"
                                    placeholder="User name"
                                    defaultValue={user.name}
                                    disabled
                                    className="input input-bordered input-primary w-full max-w-xs mr-3"
                                />
                            }

                            <motion.button 
                                className="btn btn-warning btn-sm" 
                                onClick={() => setEditing(true)}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <FaEdit size={14} />
                            </motion.button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <motion.h2 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="text-xl font-semibold  mb-2"
                        >
                            Email
                        </motion.h2>
                        <motion.input
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            type="text"
                            defaultValue={user.email}
                            disabled
                            className="input input-bordered input-primary w-full max-w-xs"
                        />
                    </div>

                    <div className="mb-6">
                        <motion.h2 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="text-xl font-semibold  mb-2"
                        >
                            Auth Method
                        </motion.h2>
                        <motion.input
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            type="text"
                            defaultValue={user.authMethod}
                            disabled
                            className="input input-bordered input-primary w-full max-w-xs"
                        />
                    </div>
                </motion.div>

            </div>
            <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="divider my-0"
            />
            
        </div>
    );
};

export default ProfileConfig;