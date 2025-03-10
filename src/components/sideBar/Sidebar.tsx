import React, { useState, useEffect } from "react";
import {
    FiArrowDown,
    FiArrowUp,
    FiBarChart,
    FiChevronDown,
    FiChevronsRight,
    FiCreditCard,
    FiHome,
    FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { useUser } from "@/context/userContext";
import Image from 'next/image';
import Link from "next/link";
import { GrGroup } from "react-icons/gr";
import { usePathname } from "next/navigation";

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
                <Option
                    Icon={FiBarChart}
                    title="Analytics"
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

const Option = ({ Icon, title, selected, setSelected, open, notifs }: {
    Icon: IconType;
    title: string;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    open: boolean;
    notifs?: number;
}) => {

    let linkUrl = title
    linkUrl = linkUrl[0].toLowerCase() + linkUrl.slice(1)
    return (
        <Link href={`/${linkUrl == "home" ? "app" : "app/"+linkUrl}`}>

            <motion.button
                layout
                onClick={() => setSelected(title)}
                className={`relative cursor-pointer flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-base-300 text-primary" : "text-content hover:bg-base-300"}`}
            >
                <motion.div
                    layout
                    className="grid h-full w-10 place-content-center text-lg"
                >
                    <Icon />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        {title}
                    </motion.span>
                )}

                {notifs && open && (
                    <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        style={{ y: "-50%" }}
                        transition={{ delay: 0.5 }}
                        className="absolute right-2 top-1/2 size-4 rounded bg-base-300 text-xs text-base-content"
                    >
                        {notifs}
                    </motion.span>
                )}
            </motion.button>
        </Link>
    );
};

const TitleSection = ({ open }: { open: boolean }) => {
    const { user } = useUser()
    return (
        <div className="mb-3 border-b border-base-300 pb-3">
            <div className="flex  items-center justify-between rounded-md transition-colors">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <span className="block text-xs font-semibold">{user?.name}</span>
                            <span className="block text-xs text-primary">{user?.email}</span>
                        </motion.div>
                    )}
                </div>
                {open && <FiChevronDown className="mr-2" />}
            </div>
        </div>
    );
};

const Logo = () => {
    const { user } = useUser()
    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md "
        >
            <Image src={user?.imgUrl!} alt="logo" width={100} height={100} />
        </motion.div>
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