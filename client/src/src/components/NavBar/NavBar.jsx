import { Link } from "react-router-dom";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";


const NavBar = () => {
    const { user } = useAuth();
    const [menu, setMenu] = useState(false);
    const navLinks = [
        {
            name: "Home",
            path: "/admin",
            id: 0,
        },
        {
            name: "Blogs",
            path: "/admin/blogs",
            id: 1,
        },
        {
            name: "Experiences",
            path: "/admin/experiences",
            id: 2,
        },
        {
            name: "Jobs",
            path: "/admin/jobs",
            id: 3,
        },
        {
            name: "Internships",
            path: "/admin/internships",
            id: 4,
        },
        {
            name: "Alumni",
            path: "/admin/alumnis",
            id: 5,
        },
        {
            name: "Testimonials",
            path: "/admin/testimonials",
            id: 6,
        },
        {
            name: "Events",
            path: "/admin/events",
            id: 7,
        },
        {
            name: "Notable Alumni",
            path: "/admin/notable-alumni",
            id: 8,
        },
        {
            name: "Gallery",
            path: "/admin/gallery",
            id: 9,
        },
    ]

    return (
        <>
            <nav className="fixed w-[100%] items-center justify-center border-b bg-black transition-all delay-100 z-50 ease-in-out bg-opacity-50 backdrop-blur-sm border-gray-800 shadow-md">
                <div className="flex items-center justify-between lg:w-full lg:px-5 md:w-[96%] px-4 md:px-3 lg:py-3 py-2.5 m-auto text-lg">
                    <div className="flex items-center">
                        <Link to="/" target="_blank">
                            <img src="images/logo515.png" height={140} width={140} alt="logo" className="lg:h-18 h-16 lg:w-18 w-16 rounded-full" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="lg:flex gap-5 hidden items-center text-[0.92rem]">
                            {navLinks.map((link) => (
                                <Link key={link.id} to={link.path} className="button-gradient">
                                    <span className="button-gradient-span whitespace-nowrap">{link.name}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link to="/profile">
                                    <button>
                                        <img className="h-11 w-11 rounded-full" src={`https://cloud.appwrite.io/v1/avatars/initials?name=${user.name.split(" ").join("+")}&width=80&height=80`} alt={user.name} />
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/signin" className="button-gradient">
                                    <span className="button-gradient-span">SignIn</span>
                                </Link>
                            )}

                            <button
                                type="button"
                                onClick={() => setMenu(!menu)}
                                className="animate-pulse lg:hidden button-gradient"
                            >
                                {!menu ? <HiMenuAlt3 /> : <FiX />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {menu && (
                <div className="lg:hidden fixed flex flex-col items-start text-base px-7 py-2 gap-2 inset-0 w-full h-full z-[100] shadow-md text-white bg-black">
                    <button
                        type="button"
                        onClick={() => setMenu(!menu)}
                        className="animate-pulse lg:hidden button-gradient"
                    >
                        {!menu ? <HiMenuAlt3 /> : <FiX />}
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            to={link.path}
                            className="button-gradient"
                            key={link.id}
                            onClick={() => setMenu(false)}
                        >
                            <span className="button-gradient-span whitespace-nowrap">{link.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );

}

export default NavBar;