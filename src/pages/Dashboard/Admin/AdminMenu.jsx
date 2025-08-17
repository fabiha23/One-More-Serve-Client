import React from 'react';
import { NavLink } from 'react-router';
import {
  FaUserCircle,
  FaHandHoldingHeart,
  FaUsersCog,
  FaUserShield,
  FaClipboardList,
  FaStar,
  FaChevronRight
} from 'react-icons/fa';

const AdminMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary shadow-sm'
        : 'hover:bg-base-200/50'
    }`;

  return (
    <nav className="flex flex-col gap-1">
      <NavLink to="admin-profile" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100/20 rounded-lg group-hover:bg-blue-100/30 transition-colors">
            <FaUserCircle className="text-blue-400" />
          </div>
          <span className="font-medium">Admin Profile</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="manage-donations" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100/20 rounded-lg group-hover:bg-green-100/30 transition-colors">
            <FaHandHoldingHeart className="text-green-400" />
          </div>
          <span className="font-medium">Manage Donations</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="manage-users" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100/20 rounded-lg group-hover:bg-purple-100/30 transition-colors">
            <FaUsersCog className="text-purple-400" />
          </div>
          <span className="font-medium">Manage Users</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="manage-roles" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100/20 rounded-lg group-hover:bg-amber-100/30 transition-colors">
            <FaUserShield className="text-amber-400" />
          </div>
          <span className="font-medium">Manage Role Requests</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="manage-requests" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100/20 rounded-lg group-hover:bg-red-100/30 transition-colors">
            <FaClipboardList className="text-red-400" />
          </div>
          <span className="font-medium">Manage Requests</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="feature-donations" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100/20 rounded-lg group-hover:bg-yellow-100/30 transition-colors">
            <FaStar className="text-yellow-400" />
          </div>
          <span className="font-medium">Feature Donations</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>
    </nav>
  );
};

export default AdminMenu;