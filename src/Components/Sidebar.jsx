import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineBars, AiOutlineHome } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import UserMenu from "../pages/Dashboard/User/UserMenu";
import useRole from "../hooks/UseRole";
import Loading from "./Loading";
import CharityMenu from "../pages/Dashboard/Charity/CharityMenu";
import AdminMenu from "../pages/Dashboard/Admin/AdminMenu";
import RestaurantMenu from "../pages/Dashboard/Restaurant/RestaurantMenu";
import { FiHome } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router";

const Sidebar = () => {
  const { user, signOutUser } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  if (isRoleLoading) return <Loading />;

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign out hoise");
        return fetch(`${import.meta.env.VITE_API_URL}/logout`, {
          method: "POST",
          credentials: "include",
        });
      })
      .then((res) => {
        if (res.ok) {
          console.log("Signed out from Firebase and backend token cleared");
        } else {
          console.log("Backend logout failed");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="flex justify-between items-center md:hidden p-4 shadow bg-base-100">
        <h2 className="text-xl font-bold text-secondary">OneMoreServe</h2>
        <button onClick={handleToggle} className="text-primary">
          <AiOutlineBars className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between w-64 h-screen p-4 shadow-lg shadow-accent transition-transform duration-200 ease-in-out bg-base-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 absolute md:static`}
      >
        <div>
          <h2 className="text-2xl font-bold text-secondary mb-6 hidden md:block">
            OneMoreServe
          </h2>

          <div className="flex gap-2 items-center mb-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-primary" />
            )}
            <h3 className="text-lg font-bold text-accent">
              {user?.displayName || "Guest User"}
            </h3>
          </div>

          {role === "user" && <UserMenu />}
          {role === "charity" && <CharityMenu />}
          {role === "admin" && <AdminMenu />}
          {role === "restaurant" && <RestaurantMenu />}
        </div>
        <div className="flex justify-between">
          <Link to='/'>
            <button className="flex items-center gap-1 text-lg cursor-pointer text-accent hover:underline font-semibold">
              <TiHome size={21} /> Home
            </button>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-lg cursor-pointer text-error hover:underline font-semibold"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
