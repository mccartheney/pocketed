import { useUser } from "@/context/userContext";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
const Logo = () => {
    const { user } = useUser()


    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md "
        >
            <Image src={user!.imgUrl!} alt="logo" width={100} height={100} className="rounded-full h-10 w-10" />
        </motion.div>
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

export default TitleSection