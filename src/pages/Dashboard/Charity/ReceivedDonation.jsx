import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";

const RecievedDonation = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ["myPickedUpDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donationRequests?charityEmail=${user?.email}&status=Picked Up`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        My Recieved Donations
      </h2>

      {pickups.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No picked up donations yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pickups.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 shadow-md rounded-xl p-4 border border-base-200"
            >
              <h3 className="text-lg font-semibold mb-1">
                {item.donationTitle}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Restaurant:</strong> {item.restaurantName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Food Type:</strong> {item.foodType}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Pickup Time:</strong>{" "}
                {new Date(item.pickupTime).toLocaleString()}
              </p>
              <div className="mt-2">
                <span className="badge badge-success text-white">
                  Picked Up
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecievedDonation;
