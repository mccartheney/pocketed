"use client"

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