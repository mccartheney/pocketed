import {ReactNode } from "react"
import { motion } from "framer-motion";

const DrawerLink = (
    {LinkContent, url} : {LinkContent : ReactNode, url:string}
) => {
    return (
        <li className="relative flex">
            <a href={url}>{LinkContent}</a>
            <motion.div
                className="absolute left-0 p-0 top-0 bg-base-200 w-full h-full"
                initial={{ width: "100%" }} 
                animate={{ width: "0px" }}  
                transition={{ duration: 1, delay : .4 }}
            />
        </li>
    )
}

export default DrawerLink