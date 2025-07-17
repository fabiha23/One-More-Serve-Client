import React from 'react';
import { Link } from 'react-router';
import { FaUserCircle, FaHandHoldingHeart, FaUsersCog, FaUserShield, FaClipboardList, FaStar } from 'react-icons/fa';

const AdminMenu = () => {
  return (
    <nav className="flex flex-col gap-4 text-accent">
      <Link to="/dashboard/my-profile" className="flex items-center gap-2 hover:text-primary">
        <FaUserCircle /> Admin Profile
      </Link>
      <Link to="/dashboard/manage-donations" className="flex items-center gap-2 hover:text-primary">
        <FaHandHoldingHeart /> Manage Donations
      </Link>
      <Link to="/dashboard/manage-users" className="flex items-center gap-2 hover:text-primary">
        <FaUsersCog /> Manage Users
      </Link>
      <Link to="/dashboard/manage-roles" className="flex items-center gap-2 hover:text-primary">
        <FaUserShield /> Manage Role Requests
      </Link>
      <Link to="/dashboard/manage-requests" className="flex items-center gap-2 hover:text-primary">
        <FaClipboardList /> Manage Requests
      </Link>
      <Link to="/dashboard/feature-donations" className="flex items-center gap-2 hover:text-primary">
        <FaStar /> Feature Donations
      </Link>
    </nav>
  );
};

export default AdminMenu;
