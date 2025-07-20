import React from 'react';
import { NavLink } from 'react-router';
import { FaUserCircle, FaHandHoldingHeart, FaTruck, FaGift, FaHistory } from 'react-icons/fa';

const CharityMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-all ${
      isActive ? 'border-b-2 border-accent font-semibold' : 'hover:ml-4'
    }`;

  return (
    <nav className="flex flex-col gap-4 text-accent font-medium">
      <NavLink to="charity-profile" className={linkClass}>
        <FaUserCircle /> Charity Profile
      </NavLink>
      <NavLink to="my-requests" className={linkClass}>
        <FaHandHoldingHeart /> My Requests
      </NavLink>
      <NavLink to="my-pickups" className={linkClass}>
        <FaTruck /> My Pickups
      </NavLink>
      <NavLink to="received-donations" className={linkClass}>
        <FaGift /> Received Donations
      </NavLink>
      <NavLink to="transactions" className={linkClass}>
        <FaHistory /> Transaction History
      </NavLink>
    </nav>
  );
};

export default CharityMenu;
