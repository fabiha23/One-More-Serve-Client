import React from 'react';
import { NavLink } from 'react-router';
import { 
  FaUserCircle, 
  FaHandHoldingHeart, 
  FaTruck, 
  FaGift, 
  FaHistory,
  FaChevronRight 
} from 'react-icons/fa';

const CharityMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-secondary text-accent font-semibold shadow-sm' 
        : 'text-accent/80 hover:bg-primary/5 hover:text-accent'
    }`;

  return (
    <nav className="flex flex-col gap-1">
      <NavLink to="charity-profile" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FaUserCircle className="text-primary" />
          </div>
          <span>Charity Profile</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm" />
      </NavLink>

      <NavLink to="my-requests" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100/20 rounded-lg">
            <FaHandHoldingHeart className="text-amber-400" />
          </div>
          <span>My Requests</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm" />
      </NavLink>

      <NavLink to="my-pickups" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100/20 rounded-lg">
            <FaTruck className="text-blue-400" />
          </div>
          <span>My Pickups</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm" />
      </NavLink>

      <NavLink to="received-donations" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100/20 rounded-lg">
            <FaGift className="text-green-400" />
          </div>
          <span>Received Donations</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm" />
      </NavLink>

      <NavLink to="transactions" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100/20 rounded-lg">
            <FaHistory className="text-purple-400" />
          </div>
          <span>Transaction History</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm" />
      </NavLink>
    </nav>
  );
};

export default CharityMenu;