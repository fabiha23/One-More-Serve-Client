import React from "react";
import { Link } from "react-router";

const DonationCard = ({ donation }) => {
  const {
    image,
    title,
    restaurantName,
    status,
    quantity,
    location,
    pickupStart,
    pickupEnd,
    quantityUnit
  } = donation;

  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition">
      <figure className="h-48 overflow-hidden">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-sm text-accent">By: {restaurantName}</p>
        <p className="text-sm text-accent">
          Status:
          <span className={`badge ${
                        (status === "Verified"||status === "Picked Up")
                          ? "badge-success"
                          : donation.status === "Requested"
                          ? "badge-warning"
                          : "badge-neutral"
                      }`}>
            {status === "Verified" ? "Available" : status}
          </span>
        </p>
        <p className="text-sm">Quantity: {quantity} {quantityUnit}</p>
        <p className="text-sm">Location: {location}</p>
        <p className="text-sm">Pickup Time: ({pickupStart}) - ({pickupEnd})</p>
        <div className="card-actions mt-4">
          <Link to={`/donation-details/${donation._id}`}>
            <button className="btn btn-primary btn-sm w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
