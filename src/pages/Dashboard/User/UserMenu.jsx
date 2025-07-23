import React from 'react';
import { NavLink } from 'react-router';
import { FaUserCircle, FaHeart, FaStar, FaHistory, FaUserShield } from 'react-icons/fa';

const UserMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-all ${
      isActive ? 'border-b-2 border-secondary font-semibold' : 'hover:ml-4'
    }`;

  return (
    <nav className="flex flex-col gap-4 text-accent font-medium">
      <NavLink to="my-profile" className={linkClass}>
        <FaUserCircle /> My Profile
      </NavLink>
      <NavLink to="request-charity" className={linkClass}>
        <FaUserShield /> Request Charity Role
      </NavLink>
      <NavLink to="favorites" className={linkClass}>
        <FaHeart /> Favorites
      </NavLink>
      <NavLink to="my-reviews" className={linkClass}>
        <FaStar /> My Reviews
      </NavLink>
      <NavLink to="transactions" className={linkClass}>
        <FaHistory /> Transaction History
      </NavLink>
    </nav>
  );
};

export default UserMenu;
