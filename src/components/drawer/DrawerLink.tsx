import {ReactNode } from "react"

const DrawerLink = (
    {LinkContent, url} : {LinkContent : ReactNode, url:string}
) => {
    return (
        <li className="relative flex">
            <a href={url}>{LinkContent}</a>
        </li>
    )
}

export default DrawerLink