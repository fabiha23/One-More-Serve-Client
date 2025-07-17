import React from 'react';
import { Link } from 'react-router';
import { FaUserCircle, FaUtensils, FaListAlt, FaClipboardList } from 'react-icons/fa';

const RestaurantMenu = () => {
  return (
    <nav className="flex flex-col gap-4 text-accent">
      <Link to="/dashboard/my-profile" className="flex items-center gap-2 hover:text-primary">
        <FaUserCircle /> Restaurant Profile
      </Link>
      <Link to="/dashboard/add-donation" className="flex items-center gap-2 hover:text-primary">
        <FaUtensils /> Add Donation
      </Link>
      <Link to="/dashboard/my-donations" className="flex items-center gap-2 hover:text-primary">
        <FaListAlt /> My Donations
      </Link>
      <Link to="/dashboard/requested-donations" className="flex items-center gap-2 hover:text-primary">
        <FaClipboardList /> Requested Donations
      </Link>
    </nav>
  );
};

export default RestaurantMenu;
