import React from 'react';
import { NavLink } from 'react-router';
import { FaUserCircle, FaUtensils, FaListAlt, FaClipboardList } from 'react-icons/fa';

const RestaurantMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-all ${
      isActive ? 'border-b-2 border-accent font-semibold' : 'hover:ml-4'
    }`;

  return (
    <nav className="flex flex-col gap-4 text-accent font-medium">
      <NavLink to="restaurant-profile" className={linkClass}>
        <FaUserCircle /> Restaurant Profile
      </NavLink>
      <NavLink to="add-donation" className={linkClass}>
        <FaUtensils /> Add Donation
      </NavLink>
      <NavLink to="my-donations" className={linkClass}>
        <FaListAlt /> My Donations
      </NavLink>
      <NavLink to="requested-donations" className={linkClass}>
        <FaClipboardList /> Requested Donations
      </NavLink>
    </nav>
  );
};

export default RestaurantMenu;
