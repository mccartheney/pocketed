"use client"
import themeNames from "@/constants/themeNames"

const ThemeConfig = () => {

    const handleThemeChange = (themeName:string) => {
        localStorage.setItem("pocketedTheme", themeName)
        document.querySelector("html")?.setAttribute("data-theme", themeName)
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-xl">
                    Theme
                </h1>

                <select className="select select-primary select-sm w-full max-w-xs" defaultValue={localStorage.getItem("pocketedTheme")!}>
                    {
                        themeNames.map((themeName, index) => {
                            return <option key={index} onClick={() => {handleThemeChange(themeName)}} >{themeName}</option>
                        })
                    }
                </select>
            </div>
            
            <div className="divider"></div>
        </>
    )
}

export default ThemeConfig