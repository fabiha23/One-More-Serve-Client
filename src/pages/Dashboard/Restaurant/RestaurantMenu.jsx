import React from 'react';
import { NavLink } from 'react-router';
import { FaUserCircle, FaUtensils, FaListAlt, FaClipboardList, FaChartBar } from 'react-icons/fa';

const RestaurantMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-all ${
      isActive ? 'border-b-2 border-secondary font-semibold' : 'hover:ml-4'
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
      <NavLink to="donation-stats" className={linkClass}>
        <FaChartBar /> Donation Statistics
      </NavLink>
    </nav>
  );
};

export default RestaurantMenu;
