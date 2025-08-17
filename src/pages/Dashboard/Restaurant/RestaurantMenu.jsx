import React from 'react';
import { NavLink } from 'react-router';
import { 
  FaUserCircle, 
  FaUtensils, 
  FaListAlt, 
  FaClipboardList, 
  FaChartBar,
  FaChevronRight
} from 'react-icons/fa';

const RestaurantMenu = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary shadow-sm'
        : 'hover:bg-base-200/50'
    }`;

  return (
    <nav className="flex flex-col gap-1">
      <NavLink to="restaurant-profile" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100/20 rounded-lg group-hover:bg-blue-100/30 transition-colors">
            <FaUserCircle className="text-blue-400" />
          </div>
          <span className="font-medium">Restaurant Profile</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="add-donation" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100/20 rounded-lg group-hover:bg-green-100/30 transition-colors">
            <FaUtensils className="text-green-400" />
          </div>
          <span className="font-medium">Add Donation</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="my-donations" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100/20 rounded-lg group-hover:bg-amber-100/30 transition-colors">
            <FaListAlt className="text-amber-400" />
          </div>
          <span className="font-medium">My Donations</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      <NavLink to="requested-donations" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100/20 rounded-lg group-hover:bg-purple-100/30 transition-colors">
            <FaClipboardList className="text-purple-400" />
          </div>
          <span className="font-medium">Requested Donations</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink>

      {/* <NavLink to="donation-stats" className={linkClass}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100/20 rounded-lg group-hover:bg-red-100/30 transition-colors">
            <FaChartBar className="text-red-400" />
          </div>
          <span className="font-medium">Donation Statistics</span>
        </div>
        <FaChevronRight className="text-accent/40 text-sm group-hover:text-accent/60" />
      </NavLink> */}
    </nav>
  );
};

export default RestaurantMenu;