"use client"
import { FaEdit, FaCamera, FaTrash } from "react-icons/fa";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import LoadingPage from "../LoadingPage";
import toast from "react-hot-toast";
import NewProfilePicModel from "./newProfilePicModal";
import {useUser} from "@/context/userContext"

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
            console.error(error);
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
            console.error(error)
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
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-text-primary shadow-lg">
                            <img src={user.imgUrl!} alt="Profile" />
                        </div>
                        <button
                            onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
                            className="btn btn-xs btn-warning bottom-0 right-0 absolute h-min w-min p-2 rounded-full"
                        >
                            <FaCamera size={16} />
                        </button>
                        <button
                            onClick={() => {handleDeleteProfilePic()}}
                            className="btn btn-xs btn-error bottom-0 left-0 absolute h-min w-min p-2 rounded-full"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>
                </div>

                <div className="p-6 rounded-lg shadow-md bg-base-200">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold  mb-2">
                            User Name
                        </h2>
                        <div className="flex items-center">
                            {editing ? 
                                <form className="mr-3" onSubmit={(e) => {handleUserNameEdit(e)}}>
                                    <input
                                        type="text"
                                        placeholder="User name"
                                        defaultValue={user.name}
                                        ref = {userNameInputRef}
                                        className="input input-bordered input-primary w-full max-w-xs"
                                    />
                                    <button hidden type="submit"/>
                                </form>
                                    :
                                <input
                                    type="text"
                                    placeholder="User name"
                                    defaultValue={user.name}
                                    disabled
                                    className="input input-bordered input-primary w-full max-w-xs mr-3"
                                />
                            }

                            <button className="btn btn-warning btn-sm" onClick={() => setEditing(true)}>
                                <FaEdit size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold  mb-2">
                            Email
                        </h2>
                        <input
                            type="text"
                            defaultValue={user.email}
                            disabled
                            className="input input-bordered input-primary w-full max-w-xs"
                        />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold  mb-2">
                            Auth Method
                        </h2>
                        <input
                            type="text"
                            defaultValue={user.authMethod}
                            disabled
                            className="input input-bordered input-primary w-full max-w-xs"
                        />
                    </div>
                </div>

            </div>
            <div className="divider"></div>
            
        </div>
    );
};

export default ProfileConfig;