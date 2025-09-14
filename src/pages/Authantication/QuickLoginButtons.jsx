import React from 'react';
import { FaHandHoldingHeart, FaUser, FaUserShield, FaUtensils } from 'react-icons/fa';

const QuickLoginButtons = ({handleFillCredentials}) => {
    return (
        <div className="mt-3">
                    <div className="text-center mb-4">
                      <p className="text-neutral/80 text-sm font-medium mb-2">
                        Quick Login for Testing
                      </p>
                    </div>
        
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleFillCredentials("restaurant")}
                        className="flex items-center cursor-pointer justify-center gap-1.5 py-2 bg-white/10 text-neutral border border-neutral/30 rounded-md hover:bg-white/20 transition-all duration-200 text-sm"
                      >
                        <FaUtensils className="text-xs" />
                        <span>Restaurant</span>
                      </button>
                      <button
                        onClick={() => handleFillCredentials("charity")}
                        className="flex items-center cursor-pointer justify-center gap-1.5 py-2 bg-white/10 text-neutral border border-neutral/30 rounded-md hover:bg-white/20 transition-all duration-200 text-sm"
                      >
                        <FaHandHoldingHeart className="text-xs" />
                        <span>Charity</span>
                      </button>
                      <button
                        onClick={() => handleFillCredentials("admin")}
                        className="flex items-center cursor-pointer justify-center gap-1.5 py-2 bg-white/10 text-neutral border border-neutral/30 rounded-md hover:bg-white/20 transition-all duration-200 text-sm"
                      >
                        <FaUserShield className="text-xs" />
                        <span>Admin</span>
                      </button>
                    </div>
                  </div>
    );
};

export default QuickLoginButtons;