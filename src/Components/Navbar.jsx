import React, { useEffect, useState } from "react";
import { IoMenu, IoMoonOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router";
import { TbLogout2 } from "react-icons/tb";
import { FiSun } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import useRole from "../hooks/UseRole";
import UserDropdown from "./UserDropdown";
import useAxios from "../hooks/useAxios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { user, signOutUser } = useAuth();
  const [theme, setTheme] = useState("light");
  const [role] = useRole();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  let dashboardPath = "/dashboard/my-profile"; // Default path

  if (role === "admin") {
    dashboardPath = "/dashboard/admin-profile";
  } else if (role === "charity") {
    dashboardPath = "/dashboard/charity-profile";
  } else if (role === "restaurant") {
    dashboardPath = "/dashboard/restaurant-profile";
  }

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `hover:text-secondary duration-100 ${
              isActive && "border-l-3 text-secondary pl-1 border-secondary"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `hover:text-secondary duration-100 ${
              isActive && "border-l-3 text-secondary pl-1 border-secondary"
            }`
          }
          to="/all-donations"
        >
          All Donations
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            ` hover:text-secondary duration-100 ${
              isActive && "border-l-3 text-secondary pl-1 border-secondary"
            }`
          }
          to={dashboardPath}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            ` hover:text-secondary duration-100 ${
              isActive && "border-l-3 text-secondary pl-1 border-secondary"
            }`
          }
          to="/about-us"
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Signed out from Firebase");
        return axiosInstance.post("/logout"); // Logout from backend
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Backend logout successful");
          navigate("/");
        } else {
          console.log("Backend logout failed");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <nav>
      <div className="flex justify-between py-4 items-center">
        <Link to="/">
          <div className="flex gap-1 items-center">
            <img className="w-8" src={logo} alt="" />
            <h1 className="text-2xl font-bold  gap-2 hidden sm:block text-neutral">
              <span>OneMoreServe</span>
            </h1>
          </div>
        </Link>
        <div>
          <ul className="hidden xl:flex gap-16 text-neutral font-semibold">
            {links}
          </ul>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            {user ? (
              <></>
            ) : (
              <Link to="/login">
                <button className="text-neutral font-medium mr-1 hover:text-secondary cursor-pointer duration-100 border hover:border-secondary border-neutral px-3 py-1 will-change-transform rounded-sm">
                  Login
                </button>
              </Link>
            )}
          </div>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            {/* Sun icon (light mode) */}
            <FiSun className="swap-on w-6 h-6 text-neutral" />

            {/* Moon icon (dark mode) */}
            <IoMoonOutline className="text-neutral swap-off w-6 h-6" />
          </label>
          {user && (
            <div className="relative">
              <img
                onClick={() => setOpenUser(!openUser)}
                className="w-7 h-7 lg:w-8 lg:h-8 object-cover rounded-full cursor-pointer"
                src={user.photoURL}
                alt="User"
              />
              {openUser && (
                <UserDropdown
                  user={user}
                  role={role}
                  handleSignOut={handleSignOut}
                  openUser={openUser}
                />
              )}{" "}
            </div>
          )}
          <span className="text-neutral" onClick={() => setOpen(!open)}>
            {open ? (
              <RxCross2 size={32} />
            ) : (
              <IoMenu size={32} className="xl:hidden" />
            )}
          </span>
        </div>
      </div>
      <ul
        className={`px-8 space-y-7 text-lg font-semibold text-neutral md:w-1/2 h-screen lg:w-1/3 w-2/3 bg-primary top-0 py-10 backdrop-blur-xl xl:hidden absolute ${
          open ? "left-0" : "-left-180 "
        } duration-1000`}
      >
        {links}
      </ul>
    </nav>
  );
};

export default Navbar;
