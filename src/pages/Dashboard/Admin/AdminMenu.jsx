import React from 'react';
import { NavLink } from 'react-router';
import {
  FaUserCircle,
  FaHandHoldingHeart,
  FaUsersCog,
  FaUserShield,
  FaClipboardList,
  FaStar,
} from 'react-icons/fa';

const AdminMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-all ${
      isActive ? 'border-b-2 border-accent font-semibold' : 'hover:ml-4'
    }`;

  return (
    <nav className="flex flex-col gap-4 text-accent font-medium">
      <NavLink to="my-profile" className={linkClass}>
        <FaUserCircle /> Admin Profile
      </NavLink>
      <NavLink to="manage-donations" className={linkClass}>
        <FaHandHoldingHeart /> Manage Donations
      </NavLink>
      <NavLink to="manage-users" className={linkClass}>
        <FaUsersCog /> Manage Users
      </NavLink>
      <NavLink to="manage-roles" className={linkClass}>
        <FaUserShield /> Manage Role Requests
      </NavLink>
      <NavLink to="manage-requests" className={linkClass}>
        <FaClipboardList /> Manage Requests
      </NavLink>
      <NavLink to="feature-donations" className={linkClass}>
        <FaStar /> Feature Donations
      </NavLink>
    </nav>
  );
};

export default AdminMenu;
