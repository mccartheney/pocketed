import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import { MdLogin, MdAppRegistration } from "react-icons/md";

const Header = () => {
    return (
        <div className="navbar fixed w-9/10 top-5 right-0 left-0  mx-auto bg-base-200/80 backdrop-blur-sm z-50 rounded-2xl">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl gap-2">
                    <FaWallet className="text-2xl text-primary" />
                    <span className="font-bold">Pocketed</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                
                <Link href="/features" className="hover:text-primary">Home</Link>
                <div className="divider divider-horizontal transform rotate-35 mx-2"></div>
                <Link href="/pricing" className="hover:text-primary">Prices</Link>
                <div className="divider divider-horizontal transform rotate-35 mx-2"></div>
                <Link href="/about" className="hover:text-primary">About</Link>
            </div>

            <div className="navbar-end gap-2">
                <Link href="/login" className="btn btn-primary btn-sm mr-3">
                    <MdLogin className="text-lg" /> Login
                </Link>
            </div>
        </div>
    );
}

export default Header;