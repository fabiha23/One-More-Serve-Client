import React from 'react';
import { Link } from 'react-router';
import { FaUserCircle, FaHandHoldingHeart, FaTruck, FaGift, FaHistory } from 'react-icons/fa';

const CharityMenu = () => {
    return (
        <nav className="flex flex-col gap-4 text-accent">
            <Link to="/dashboard/charity-profile" className="flex items-center gap-2 hover:text-primary">
                <FaUserCircle /> Charity Profile
            </Link>
            <Link to="/dashboard/my-requests" className="flex items-center gap-2 hover:text-primary">
                <FaHandHoldingHeart /> My Requests
            </Link>
            <Link to="/dashboard/my-pickups" className="flex items-center gap-2 hover:text-primary">
                <FaTruck /> My Pickups
            </Link>
            <Link to="/dashboard/received-donations" className="flex items-center gap-2 hover:text-primary">
                <FaGift /> Received Donations
            </Link>
            <Link to="/dashboard/transactions" className="flex items-center gap-2 hover:text-primary">
                <FaHistory /> Transaction History
            </Link>
        </nav>
    );
};

export default CharityMenu;
