import React from 'react';
import { NavLink } from 'react-router';
import { 
  FaUserCircle, 
  FaHeart, 
  FaStar, 
  FaHistory, 
  FaUserShield,
  FaChevronRight
} from 'react-icons/fa';

const UserMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary shadow-sm'
        : 'hover:bg-base-200/50'
    }`;

  return (
    <nav className="flex flex-col gap-1">
      <NavLink to="my-profile" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100/20 rounded-lg group-hover:bg-blue-100/30 transition-colors">
            <FaUserCircle className="text-blue-400" />
          </div>
          <span className="font-medium">My Profile</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="request-charity" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100/20 rounded-lg group-hover:bg-purple-100/30 transition-colors">
            <FaUserShield className="text-purple-400" />
          </div>
          <span className="font-medium">Request Charity Role</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="favorites" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100/20 rounded-lg group-hover:bg-red-100/30 transition-colors">
            <FaHeart className="text-red-400" />
          </div>
          <span className="font-medium">Favorites</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="my-reviews" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100/20 rounded-lg group-hover:bg-yellow-100/30 transition-colors">
            <FaStar className="text-yellow-400" />
          </div>
          <span className="font-medium">My Reviews</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="transactions" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100/20 rounded-lg group-hover:bg-green-100/30 transition-colors">
            <FaHistory className="text-green-400" />
          </div>
          <span className="font-medium">Transaction History</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>
    </nav>
  );
};

export default UserMenu;