import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FiArrowDown,
    FiArrowUp,
    FiBarChart,
    FiCreditCard,
    FiHome,
    FiSettings,    
} from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import Link from "next/link";
const Dock = () => {

    const [selected, setSelected] = useState("app");
    const pathName = usePathname();


    useEffect(() => {
        const lastSegment = pathName?.split("/").filter(Boolean).pop() || "";
        if (lastSegment === "app") {
            setSelected("Home");
        } else {
            const capitalizedSegment = lastSegment[0].toUpperCase() + lastSegment.slice(1);
            setSelected(capitalizedSegment);
        }
    }, [pathName]); 

    console.log("selected",selected)

    return (
        <div className="dock dock-xs">
            <Link href="/app" className={`${selected === "Home" ? "dock-active" : ""}`}>
                <button>
                    <FiHome />
                </button>
            </Link>

            <Link href="/app/cards" className={`${selected === "Cards" ? "dock-active" : ""}`}>
                <button className="dock-active">
                    <FiCreditCard />
                </button>
            </Link>

            <Link href="/app/incomes" className={`${selected === "Incomes" ? "dock-active" : ""}`}>
                <button>
                    <FiArrowUp />
                </button>
            </Link>

            <Link href="/app/expenses" className={`${selected === "Expenses" ? "dock-active" : ""}`}>
                <button>
                    <FiArrowDown/>
                </button>
            </Link>

            <Link href="/app/friends" className={`${selected === "Friends" ? "dock-active" : ""}`}>
                <button className="dock-active">
                    <GrGroup/>
                </button>
            </Link>

            <Link href="/app/settings" className={`${selected === "Settings" ? "dock-active" : ""}`}>
                <button>
                    <FiSettings/>
                </button>
            </Link>
        </div>
    )
}

export default Dock;