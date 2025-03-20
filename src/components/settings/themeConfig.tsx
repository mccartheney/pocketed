"use client"
import themeNames from "@/constants/themeNames"     

const ThemeConfig = () => {

    // update theme on local storage and html
    const handleThemeChange = (themeName:string) => {
        // update the theme on local storage and html
        localStorage.setItem("pocketedTheme", themeName)
        document.querySelector("html")?.setAttribute("data-theme", themeName)
    }

    return (
        <div className ="p-3">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-bold">
                    Theme
                </h1>

                <select className="select select-primary select-sm w-full max-w-xs" defaultValue={localStorage.getItem("pocketedTheme")!}>
                    {
                        themeNames.map((themeName : string, index : number) => {
                            return <option key={index} onClick={() => {handleThemeChange(themeName)}} >{themeName}</option>
                        })
                    }
                </select>
            </div>
            
            <div className="divider"></div>
        </div>
    )
}

export default ThemeConfig