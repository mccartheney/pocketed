"use client"

import { useUser } from "@/context/userContext"
import { FiEdit2, FiLogOut, FiTrash2 } from "react-icons/fi"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"
import NewProfilePicModel from "@/components/settings/newProfilePicModal"
import ProfileConfig from "@/components/settings/profileConfig"
import ThemeConfig from "@/components/settings/themeConfig"
import ProfileActions from "@/components/settings/profileActions"
import DeleteAccountModal from "@/components/settings/deleteAccountModal"

const Page = () => {
    return (
        <div className="">
            <NewProfilePicModel/>
            <ProfileConfig />
            <ThemeConfig />
            <ProfileActions />
            <DeleteAccountModal />
        </div>
    )
}

export default Page