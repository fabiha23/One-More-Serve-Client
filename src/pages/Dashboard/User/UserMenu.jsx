import React from 'react';
import { Link } from 'react-router';
import { FaUserCircle, FaHeart, FaStar, FaHistory, FaUserShield } from 'react-icons/fa';

const UserMenu = () => {
    return (
        <nav className="flex flex-col gap-4 text-accent">
            <Link to="/dashboard/my-profile" className="flex items-center gap-2 hover:text-primary">
                <FaUserCircle /> My Profile
            </Link>
            <Link to="/dashboard/request-charity" className="flex items-center gap-2 hover:text-primary">
                <FaUserShield /> Request Charity Role
            </Link>
            <Link to="/dashboard/favorites" className="flex items-center gap-2 hover:text-primary">
                <FaHeart /> Favorites
            </Link>
            <Link to="/dashboard/reviews" className="flex items-center gap-2 hover:text-primary">
                <FaStar /> My Reviews
            </Link>
            <Link to="/dashboard/transactions" className="flex items-center gap-2 hover:text-primary">
                <FaHistory /> Transaction History
            </Link>
        </nav>
    );
};

export default UserMenu;
