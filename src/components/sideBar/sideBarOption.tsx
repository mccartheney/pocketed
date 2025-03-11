import { IconType } from "react-icons";
import Link from "next/link";
import { motion } from "framer-motion";

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
        <Link href={`/${linkUrl == "home" ? "app" : "app/" + linkUrl}`}>

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
                        className="text-xs font-medium text-base-200-content"
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


export default Option