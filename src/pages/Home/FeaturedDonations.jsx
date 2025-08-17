import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaUtensils,
  FaStore,
  FaMapMarkerAlt,
  FaWeightHanging,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading";

const FeaturedDonationsSection = () => {
  const axiosInstance = useAxios();

  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations", {
        params: {
          featured: true,
        },
      });

      return res.data.slice(0, 4);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-10">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">
          Featured Donations
        </h2>

        {featuredDonations.length === 0 ? (
          <div className="text-center py-8 bg-base-100 rounded-lg shadow">
            <p className="text-accent">No featured donations available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDonations.map((donation) => (
              <div
                key={donation._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition hover:-translate-y-1 duration-300 border border-neutral rounded-xl overflow-hidden group"
              >
                <figure className="h-40 relative overflow-hidden">
                  <img
                    src={donation.donationImage}
                    alt={donation.title}
                    className="w-full h-full object-cover transition duration-500"
                  />
                  <div className="absolute top-2 right-2 badge badge-error gap-1 text-xs px-3 py-2 font-medium border border-base-100">
                    <FaStar className="text-yellow-300" />
                    Featured
                  </div>
                </figure>

                <div className="card-body p-5">
                  <h3 className="card-title text-lg font-semibold mb-2 text-accent">
                    {donation.title}
                  </h3>

                  <div className="space-y-2 text-accent/80 text-sm">
                    <div className="flex items-center gap-2">
                      <FaUtensils className="text-primary" />
                      <span>{donation.foodType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStore className="text-primary" />
                      <span>{donation.restaurantName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>
                        {donation.location || "Location not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions mt-4 flex justify-between items-center">
                    <span
                      className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                        donation.status === "verified" ||
                        donation.status === "picked up"
                          ? "bg-green-100 text-green-800 border border-green-200" // Available/Verified
                          : donation.status === "requested"
                          ? "bg-amber-100 text-amber-800 border border-amber-200" // Requested
                          : "bg-gray-100 text-gray-800 border border-gray-200" // Default/Other
                      }`}
                    >
                      {donation.status === "verified"
                        ? "Available"
                        : donation.status.charAt(0).toUpperCase() +
                          donation.status.slice(1)}
                    </span>

                    <Link
                      to={`/donation-details/${donation._id}`}
                      className="relative bg-primary text-accent text-sm font-semibold py-1 px-5 rounded-lg hover:bg-secondary transition-all duration-300 active:scale-[0.90] hover:scale-103 border border-primary/20 overflow-hidden group inline-flex items-center justify-center gap-2 will-change-transform"
                    >
                      <span>Details</span>
                      <FaArrowRight className=" w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      <span className=" absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </section>
  );
};

export default FeaturedDonationsSection;
