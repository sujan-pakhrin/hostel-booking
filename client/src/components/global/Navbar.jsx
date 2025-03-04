import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../assets/logo/logo.svg';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex justify-center h-[64px]  bg-white sticky top-0 text-[#272D37] lg:h-[86px] z-20">
            <nav className="flex justify-between items-center max-w-[343px] w-full md:max-w-[704px] lg:max-w-full relative">
                <div className="flex items-center h-[32px] justify-between lg:w-full">
                    <div className="flex gap-[64px] items-center">
                        {/* <Link to="/">Hostel</Link> */}
                        <img src={logo} alt="" className="h-[100px]" />
                        <div className="hidden lg:flex items-center">
                            <ul className="flex gap-[32px] font-semibold text-[15px] leading-[22px]">
                                <Link to="/">
                                    <li>Home</li>
                                   
                                </Link>

                                <li>Our Products</li>
                                <li className="flex gap-[8px] items-center">
                                    <span>Resources</span>
                                </li>
                                <Link to="/contact">
                                    <li>Contacts</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                        <Link to={"/register"}>
                            <button className="px-6 py-3 font-semibold text-[15px] leading-[22px] text-primary rounded-sm">
                                Sign Up
                            </button>
                        </Link>
                        <Link to={"/login"}>
                            <button className="px-6 py-3 bg-primary font-semibold text-[15px] leading-[22px] text-white rounded-sm">
                                Log In
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="lg:hidden">
                    {open ? (
                        <FaTimes
                            className="text-xl h-[17px] w-[17px]"
                            onClick={() => setOpen((prev) => !prev)}
                        />
                    ) : (
                        <FaBars
                            className="text-xl h-[17px] w-[17px] font-thin"
                            onClick={() => setOpen((prev) => !prev)}
                        />
                    )}
                    {open && (
                        <div className="absolute top-[64px] right-0 bg-white flex justify-center items-center px-16 py-10 md:px-[170px] border rounded-sm border-[#EAEBF0]">
                            <ul className="flex flex-col  items-center gap-[48px] font-semibold text-[15px] leading-[22px]">
                                <Link to="/">
                                    <li>Home</li>
                                </Link>
                                <li>Our Products</li>
                                <li className="flex gap-[8px] items-center">
                                    <span>Resources</span>
                                </li>
                                <Link to="/contact">
                                    <li>Contacts</li>
                                </Link>
                                <li>
                                    <button className="px-6 py-3 font-semibold text-[15px] leading-[22px] text-primary rounded-sm">
                                        Sign Up
                                    </button>
                                </li>
                                <li>
                                    <button className="px-6 py-3 bg-primary font-semibold text-[15px] leading-[22px] text-white rounded-sm">
                                        Log In
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
