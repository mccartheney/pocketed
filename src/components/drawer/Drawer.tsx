import { ElementType } from "react";
import { motion } from "framer-motion";
import PocketedLogo from "../Logo";
import { CiLogout } from "react-icons/ci";
import { MdDashboard, MdCreditCard, MdAttachMoney, MdSettings } from "react-icons/md";
import { signOut } from "next-auth/react";
import DrawerLink from "./DrawerLink";
import DrawerDivider from "./DrawerDivider";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Drawer = ({ PageContent, userInfo }: { PageContent: ElementType; userInfo: { name: string; imgUrl: string } }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-3">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
                <PageContent />
            </div>

            <motion.div
                className="drawer-side "
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: "linear", duration : ".4" }}
            >
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu flex flex-col bg-base-200 h-[100%] text-base-content min-h-full w-80 p-4">
                    <PocketedLogo />
                    <DrawerDivider marginPosition="b" />
                    <DrawerLink LinkContent={<><MdDashboard /> Dashboard</>} url="/" />
                    <DrawerLink LinkContent={<><MdCreditCard /> Cards</>} url="/cards" />
                    <DrawerDivider marginPosition="y" />
                    <DrawerLink LinkContent={<><FaChevronUp /> Incomes</>} url="/incomes"/>
                    <DrawerLink LinkContent={<><FaChevronDown /> Expenses</>} url="/expenses" />
                    <DrawerDivider marginPosition="y" />
                    <DrawerLink LinkContent={<><MdAttachMoney /> Economies</>} url="/economies" />
                    <DrawerLink LinkContent={<><MdSettings /> Settings</>} url="/settings" />

                    <li className="flex-grow flex justify-end">
                        <motion.div
                            className="userInfo p-1 flex flex-col items-start w-[100%] "
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{duration:1 }}
                        >
                            <div className="avatar flex mb-2 items-center">
                                <div className="w-10 mr-4 rounded-full">
                                    <img src={userInfo.imgUrl} alt={`${userInfo.name}`} />
                                </div>
                                <p>{userInfo.name}</p>
                            </div>
                            <motion.button
                                className="btn w-full text-xl py-[2px] btn-primary flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                <CiLogout />
                            </motion.button>
                        </motion.div>
                    </li>
                </ul>

            </motion.div>
        </div>
    );
};

export default Drawer;
