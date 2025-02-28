"use client"
import { FaEdit, FaCamera, FaTrash } from "react-icons/fa";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import LoadingPage from "../LoadingPage";
import toast from "react-hot-toast";
import NewProfilePicModel from "./newProfilePicModal";
import {useUser} from "@/context/userContext"

const ProfileConfig = () => {
    const session = useSession() 
    const { user, setUser } = useUser();

    const [editing, setEditing] = useState <boolean>(false)
    const userNameInputRef = useRef<HTMLInputElement | null>(null)
    

    useEffect(function getUser () {
        const userEmail = session.data?.user?.email
        axios.get("/api/user", {
            params : {email : userEmail}
        })
            .then(response => setUser(response.data.message))
    },[])

    if (!user) return <LoadingPage/>

    const handleDeleteProfilePic = () => {
        axios.put("/api/user/", {
            email : user.email
        })
            .then(response => {
                if (response.data.status = 200) {
                    setUser(response.data.UUser)
                    toast.success(response.data.message)
                }else toast.error(response.data.message)
            })
    }

    const handleUserNameEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.put("/api/user",{
            email : user.email,
            newUserName : userNameInputRef.current?.value,
        })
        .then(response => {
            if (response.data.status === 200) {
                setUser(response.data.UUser)
                toast.success(response.data.message)
            } else toast.error(response.data.message)

            setEditing(false)

            userNameInputRef.current!.value = user.name
        })
    }

    return (
        <div className="">
            <NewProfilePicModel email={user.email} setUser={setUser}/>
            <div className="p-2">
                <h1 className="text-2xl font-bold mb-6">
                    Profile Settings
                </h1>

                <div className="profileImage flex items-center mb-8">
                    <div className="avatar relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img src={user.image!} alt="Profile" />
                        </div>
                        <button
                            onClick={() => document.getElementById('my_modal_3').showModal()}
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