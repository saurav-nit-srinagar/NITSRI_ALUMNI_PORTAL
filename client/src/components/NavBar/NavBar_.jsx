import { Link } from "react-router-dom";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import "./Navbar.css";

const NavBar = () => {
  const { user } = useAuth();
  const [menu, setMenu] = useState(false);
  const [popup, setPopup] = useState(-1);

  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About NITSGR",
      children: [
        {
          name: "About NITSGR",
          link: "/about",
        },
        {
          name: "History",
          link: "/history",
        },
        {
          name: "Notable Alumni",
          link: "/notableAlumni",
        },
        {
          name: "Gallery",
          link: "/gallery",
        }
      ]
    },
    {
      name: "Alumni Database",
      children: [
        {
          name: "UG",
          link: "/alumni-database?role=ug",
        },
        {
          name: "PG",
          link: "/alumni-database?role=pg",
        },
        {
          name: "Ph.D",
          link: "/alumni-database?role=phd",
        },
        {
          name: "Faculty/Staff",
          link: "/alumni-database?role=faculty-staff",
        },
      ]
    },
    {
      name: "Alumni Speaks",
      children: [
        {
          name: "Blogs",
          link: "/blogs",
        },
        {
          name: "Experience",
          link: "/experiences",
        },
        {
          name: "Jobs",
          link: "/jobs",
        },
        {
          name: "Internship",
          link: "/internships",
        },
      ]
    },
    {
      name: "Alumni Meets",
      children: [
        {
          name: "Alumni Meet",
          link: "/alumni-meet",
        },
        {
          name: "Previous Meets",
          link: "/prev-alumni-meets",
        },
      ]
    },
    {
      name: "JobFit Insight",
      link: "/jobfit-insight",

    },
    {
      name: "GIVING BACK",
      children: [
        {
          name: "Giving Matters?",
          link: "/why-giving-matters"
        },
        {
          name: "Donate Now",
          link: "/donate-now"
        }
      ]
    },

    {
      name: "Chatroom",
      link: "/chatroom"
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    }
  ];

  return (
    <div className="sticky top-0 left-0 z-50">
      <nav className="items-center justify-center border-b bg-black transition-all delay-100 z-50 ease-in-out bg-opacity-50 backdrop-blur-sm border-gray-800 shadow-md">
        <div className="flex items-center justify-between w-full gap-6 lg:px-11 md:w-[96%] px-4 md:px-4 py-3 m-auto text-lg">
          <div className="flex items-center shrink-0">
            <Link to="/">
              <img
                src="images/logo515.png"
                height={140}
                width={140}
                alt="logo"
                className="h-16 w-16 lg:h-18 lg:w-18 rounded-full"
              />
            </Link>
          </div>

          <div className="lg:flex gap-3 hidden items-center text-[0.86rem]">
            {navLinks.map((link, index) => {
              if (link.children) {
                return (
                  <div key={index} className="nav-link">
                    <button
                      onClick={() => setPopup(index)}
                      onMouseOver={() => (popup > -1 ? setPopup(-1) : setPopup(index))}
                      onMouseLeave={() => setPopup(-1)}
                      className="button-gradient flex items-center whitespace-nowrap"
                    >
                      <span className="button-gradient-span whitespace-nowrap text-sm">
                        {link.name} <MdKeyboardArrowDown size={22} />
                      </span>
                    </button>
                    {popup === index && (
                      <div
                        className="bg-gray-950 shadow-lg -ml-1 border border-gray-800 px-5 w-48 py-5 rounded-xl absolute flex-col"
                        onMouseLeave={() => setPopup(-1)}
                        onMouseOver={() => setPopup(index)}
                      >
                        <ul className="dropdown flex flex-col gap-1.5 whitespace-nowrap">
                          {link.children.map((child, i) => (
                            <Link
                              key={i}
                              to={child.link}
                              className="dropdown-link button-gradient mb-2"
                              onClick={() => setPopup(-1)}
                            >
                              <span className="button-gradient-span whitespace-nowrap text-sm">{child.name}</span>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <Link key={index} to={link.link} className="button-gradient">
                    <span className="button-gradient-span whitespace-nowrap text-sm">{link.name}</span>
                  </Link>
                );
              }
            })}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex flex-row gap-4">
                <Link to="/admin" className="button-gradient">
                  <span className="button-gradient-span text-sm">Admin</span>
                </Link>

                <Link to="/profile">
                  <img
                    title="profile"
                    src={`https://cloud.appwrite.io/v1/avatars/initials?name=${user.name.split(" ").join("+")}&width=80&height=80`}
                    alt="profile"
                    className="h-11 w-11 hover:scale-105 transition-all rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <Link to="/admin" className="button-gradient">
                  <span className="button-gradient-span text-sm">Admin</span>
                </Link>

                <Link to="/signin" className="button-gradient">
                  <span className="button-gradient-span text-sm">SignIn</span>
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMenu(!menu)}
              className="lg:hidden z-[100000] border focus:ring-[2.5px] focus:outline-none font-medium rounded-full text-sm px-2.5 py-0.5 text-center items-center focus:ring-gray-400 bg-gray-800 border-gray-900 text-white hover:bg-gray-700 mr-2"
              aria-label={menu ? "Close Menu" : "Open Menu"}
            >
              <span className="button-gradient-span">
                {!menu ? <HiMenuAlt3 /> : <FiX />}
              </span>
            </button>


          </div>
        </div>
      </nav>
      <div className={`lg:hidden xl:hidden fixed flex flex-col items-start text-base px-7 py-2 justify-center gap-2 inset-0 w-full h-full z-[100] shadow-md text-white bg-gray-950 transition-all ease-in-out delay-150 ${menu ? "translate-x-0" : "translate-x-[100%]"}`}>
        <button
          type="button"
          aria-label={menu ? "Close Menu" : "Open Menu"}
          onClick={() => setMenu(!menu)}
          className="animate-pulse lg:hidden top-3 right-6 border focus:ring-[2.5px] focus:outline-none font-medium rounded-lg text-lg px-2.5 py-2.5 mt-2 text-center items-center focus:ring-gray-400 bg-gray-800 border-gray-900 text-white hover:bg-gray-700 absolute"
        >
          {!menu ? <HiMenuAlt3 /> : <FiX />}
        </button>
        {navLinks.map((link, index) => {
          if (link.children) {
            return (
              <div key={index} className="flex flex-col sm:gap-0 gap-1">
                <div className="text-sky-500">
                  {link.name}
                </div>
                <div>
                  {link.children.map((child, i) => (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={child.link}
                      className="dropdown-link text-base"
                      key={i + "child"}
                      onClick={() => setMenu(!menu)}
                    >
                      <p className="text-gray-400 text-sm sm:py-0 py-0.5 hover:text-blue-400">
                        {child.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          } else {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={link.link}
                className="dropdown-link mb-2"
                key={index}
                onClick={() => setMenu(!menu)}
              >
                <p className="text-sky-500 hover:text-blue-400 text-sm">
                  {link.name}
                </p>
              </Link>
            )
          }
        })}
      </div>
    </div>
  );
};

export default NavBar;
