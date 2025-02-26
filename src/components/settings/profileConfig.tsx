"use client"
import { FaEdit, FaCamera, FaLock, FaTrash } from "react-icons/fa";
import { useState } from "react";

const ProfileConfig = () => {


    return (
        <div className="">
            <div className="p-2">
                <h1 className="text-2xl font-bold mb-6">
                    Profile Settings
                </h1>

                <div className="profileImage flex items-center mb-8">
                    <div className="avatar relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
                        </div>
                        <button
                            className="btn btn-xs btn-warning bottom-0 right-0 absolute h-min w-min p-2 rounded-full"
                        >
                            <FaCamera size={16} />
                        </button>
                        <button
                            className="btn btn-xs btn-error bottom-0 left-0 absolute h-min w-min p-2 rounded-full"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>

                    {/* <div className="ml-6">
                        <button className="btn btn-primary btn-sm mr-3">Change Picture</button>
                        <button className="btn btn-error btn-sm">Remove Picture</button>
                    </div> */}
                </div>

                <div className="p-6 rounded-lg shadow-md bg-base-200">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold  mb-2">
                            User Name
                        </h2>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="User name"
                                className="input input-bordered input-primary w-full max-w-xs mr-3"
                            />
                            <button className="btn btn-warning btn-sm">
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
                            placeholder="user@email.com"
                            className="input input-bordered input-primary w-full max-w-xs"
                        />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold  mb-2">
                            Auth Method
                        </h2>
                        <input
                            type="text"
                            placeholder="auth"
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