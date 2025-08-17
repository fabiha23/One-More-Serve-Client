import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import UserMenu from "../pages/Dashboard/User/UserMenu";
import useRole from "../hooks/UseRole";
import Loading from "./Loading";
import CharityMenu from "../pages/Dashboard/Charity/CharityMenu";
import AdminMenu from "../pages/Dashboard/Admin/AdminMenu";
import RestaurantMenu from "../pages/Dashboard/Restaurant/RestaurantMenu";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import useAxios from "../hooks/useAxios";

const Sidebar = () => {
  const { user, signOutUser } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        return axiosInstance.get("/logout");
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="flex justify-between items-center lg:hidden p-4 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-b border-neutral/20 ">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 h-8" src={logo} alt="Logo" />
          <span className="text-xl font-bold text-accent">OneMoreServe</span>
        </Link>
        <button 
          onClick={handleToggle} 
          className="text-accent p-2 rounded-lg hover:bg-primary/20 transition-all"
        >
          {isOpen ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <AiOutlineBars className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 flex flex-col justify-between w-72 h-screen p-6 bg-gradient-to-b from-base-100 to-base-200 border-r border-neutral/20 shadow-xl transition-all duration-300 ease-in-out top-0 ${
          isOpen ? "left-0" : "-left-full"
        } lg:left-0`}
      >

        <div className="space-y-4">
          {/* Logo/Brand */}
          <Link to="/" className="lg:flex items-center gap-1 hidden">
            <img className="w-8 h-8" src={logo} alt="Logo" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              OneMoreServe
            </h2>
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200 border border-neutral/10 shadow-sm">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-primary/80" />
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-base-200"></div>
            </div>
            <div>
              <h3 className="font-semibold text-accent">
                {user?.displayName || "Guest"}
              </h3>
              <p className="text-xs text-accent/60">
                {role ? `${role.charAt(0).toUpperCase() + role.slice(1)}` : "User"}
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-1">
            {role === "user" && <UserMenu />}
            {role === "charity" && <CharityMenu />}
            {role === "admin" && <AdminMenu />}
            {role === "restaurant" && <RestaurantMenu />}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto space-y-2 border-t border-neutral/10 pt-4">
  <Link
    to="/"
    className="flex items-center gap-3 p-3 rounded-xl text-accent hover:bg-primary/5 transition-all group"
  >
    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
      <TiHome className="w-5 h-5 text-primary" />
    </div>
    <span className="font-medium">Return Home</span>
  </Link>
  
  <button
    onClick={handleSignOut}
    className="flex items-center gap-3 w-full p-3 rounded-xl text-error hover:bg-error/5 transition-all group"
  >
    <div className="p-2 bg-error/10 rounded-lg group-hover:bg-error/20 transition-colors">
      <FaSignOutAlt className="w-5 h-5 text-error" />
    </div>
    <span className="font-medium">Sign Out</span>
  </button>
</div>
      </div>
    </>
  );
};

export default Sidebar;