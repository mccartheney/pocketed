import React, { useState, useEffect } from "react";
import {
    FiArrowDown,
    FiArrowUp,
    FiChevronsRight,
    FiCreditCard,
    FiHome,
    FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { GrGroup } from "react-icons/gr";
import { usePathname } from "next/navigation";
import Option from "./sideBarOption";
import TitleSection from "./SidebarTitle";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
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

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r border-base-300 bg-base-200 p-2"
            style={{
                width: open ? "225px" : "fit-content",
            }}
        >
            <TitleSection open={open} />

            <div className="space-y-1">
                <Option
                    Icon={FiHome}
                    title="Home"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={FiCreditCard}
                    title="Cards"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <div className="divider m-0 p-0"></div>
                <Option
                    Icon={FiArrowUp}
                    title="Incomes"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={FiArrowDown}
                    title="Expenses"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <div className="divider m-0 p-0"></div>
                <Option
                    Icon={GrGroup}
                    title="Friends"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <div className="divider m-0 p-0"></div>
                <Option
                    Icon={FiSettings}
                    title="Settings"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
            </div>

            <ToggleClose open={open} setOpen={setOpen} />
        </motion.nav>
    );
};




const ToggleClose = ({ open, setOpen }: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <motion.button
            layout
            onClick={() => setOpen((pv) => !pv)}
            className="absolute bottom-0 left-0 right-0 border-t border-base-300 transition-colors hover:bg-base-300 cursor-pointer"
        >
            <div className="flex items-center p-2">
                <motion.div
                    layout
                    className="grid size-10 place-content-center text-lg"
                >
                    <FiChevronsRight
                        className={`transition-transform ${open && "rotate-180"}`}
                    />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        Hide
                    </motion.span>
                )}
            </div>
        </motion.button>
    );
};

export default Sidebar