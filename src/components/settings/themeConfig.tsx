"use client"
import themeNames from "@/constants/themeNames"
import { motion } from "framer-motion"
import { useUser } from "@/context/userContext"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useState } from "react"

const ThemeConfig = () => {
    const { user, setUser } = useUser()
    const [isLoading, setIsLoading] = useState(false)

    // update theme on local storage and html
    const handleThemeChange = async (themeName: string) => {
        // update the theme on local storage and html

        const response = await axios.put("/api/user", {
            email: user?.email,
            updateKey: "theme",
            keyValue: themeName
        })

        if (response.data.status === 200) {
            toast.success("Theme updated")
            setUser(response.data.UUser)
            document.querySelector("html")?.setAttribute("data-theme", themeName)
        } else {
            toast.error("Failed to update theme")
        }
    
    }

    return (
        <div className="px-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center px-2">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-2xl font-bold mb-3 md:mb-0"
                >
                    Theme
                </motion.h1>

                <motion.select
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="select select-primary select-sm w-full max-w-xs"
                    defaultValue={user?.theme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                >
                    {themeNames.map((themeName: string, index: number) => (
                        <option key={index} value={themeName}>
                            {themeName}
                        </option>
                    ))}
                </motion.select>
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

export default ThemeConfig