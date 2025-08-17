import React from "react";
import { Link } from "react-router";
import { FaStore, FaMapMarkerAlt, FaBoxOpen, FaArrowRight } from "react-icons/fa";

const DonationCard = ({ donation }) => {
  const {
    donationImage,
    title,
    restaurantName,
    status,
    quantity,
    location,
    quantityUnit,
    _id
  } = donation;

  return (
    <div className="group bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral/20 hover:border-primary/30">
      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={donationImage} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 title={title} className="text-xl font-bold text-accent line-clamp-1">{title}</h3>
          <span className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
  status === "verified"
    ? "bg-green-100 text-green-800 border border-green-200" 
    : status === "picked up"
    ? "bg-blue-100 text-blue-800 border border-blue-200" 
    : status === "requested"
    ? "bg-amber-100 text-amber-800 border border-amber-200" 
    : "bg-gray-100 text-gray-800 border border-gray-200"
}`}>
  {status === "verified" ? "Available" : status}
</span>
        </div>
        
        <div className="space-y-3 text-sm text-accent/80">
          <div className="flex items-center gap-2">
            <FaStore className="text-primary" />
            <span>{restaurantName}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaBoxOpen className="text-primary" />
            <span>{quantity} {quantityUnit}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span className="line-clamp-1">{location || "Location not specified"}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-6">
          <Link to={`/donation-details/${_id}`}>
            <button className="w-full py-2 px-4 hover:bg-secondary text-accent/90 rounded-lg bg-primary transition-all duration-200 font-semibold flex items-center justify-center gap-2 group-hover:bg-primary cursor-pointer">
              View Details
              <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;