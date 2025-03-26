"use client"
import themeNames from "@/constants/themeNames"     
import { motion } from "framer-motion"
const ThemeConfig = () => {

    // update theme on local storage and html
    const handleThemeChange = (themeName:string) => {
        // update the theme on local storage and html
        localStorage.setItem("pocketedTheme", themeName)
        document.querySelector("html")?.setAttribute("data-theme", themeName)
    }

    return (
        <div className ="px-3">
            <div className="flex flex-col md:flex-row justify-between mditems-center px-2">
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
                    defaultValue={localStorage.getItem("pocketedTheme")!}
                >
                    {
                        themeNames.map((themeName : string, index : number) => {
                            return <option key={index} onClick={() => {handleThemeChange(themeName)}} >{themeName}</option>
                        })
                    }
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