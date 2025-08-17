import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaStore,
  FaUtensils,
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const MyPickup = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  // Fetch all requests (accepted or picked up)
  const {
    data: pickups = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donationRequests?charityEmail=${user?.email}&status=accepted&status=picked up`
      );
      return res.data;
    },
  });

  // Confirm Pickup Mutation
  const confirmPickup = useMutation({
    mutationFn: async (donationId) => {
      return await axiosSecure.patch(`/donations/status/${donationId}`, {
        status: "picked up",
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Pickup confirmed!",
        icon: "success",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE",
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Could not confirm pickup",
        icon: "error",
        background: "#FEFAE0",
        confirmButtonColor: "#f43f5e",
      });
    },
  });

  if (isLoading) return <Loading />;

  // Filter accepted requests only
  const acceptedRequests = pickups.filter((p) => p.status === "accepted");
  // Check if all are picked up
  const allPickedUp = pickups.length > 0 && acceptedRequests.length === 0;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Requests</h1>
        </div>
      </div>

      {pickups.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-8 text-center border border-neutral">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <FaBox className="text-accent text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-accent mb-2">
            No pickups assigned
          </h3>
          <p className="text-accent/70 max-w-md mx-auto">
            When restaurants accept your donation requests, they'll appear here
            for pickup.
          </p>
        </div>
      ) : allPickedUp ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-6 text-center border border-primary">
          <FaCheckCircle className="mx-auto text-primary text-4xl mb-3" />
          <h3 className="text-xl font-medium text-accent mb-2">
            All pickups completed
          </h3>
          <p className="text-accent/70">
            Your requests have been picked up. You can see them in the Received
            Donations page.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedRequests.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-accent mb-3">
                  {item.donationTitle}
                </h3>

                <div className="space-y-3 text-sm text-accent/80 mb-5">
                  <div className="flex items-center">
                    <FaStore className="mr-2 text-accent/60" />
                    <span>
                      <span className="font-medium">Restaurant:</span>{" "}
                      {item.restaurantName}
                    </span>
                  </div>
                  {item.restaurantLocation && (
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Location:</span>
                      {item.restaurantLocation}
                    </div>
                  )}
                  <div className="flex items-center">
                    <FaUtensils className="mr-2 text-accent/60" />
                    <span>
                      <span className="font-medium">Food Type:</span>
                      {item.foodType}
                    </span>
                  </div>
                  {item.quantity && (
                    <div className="flex items-center">
                      <FaBox className="mr-2 text-accent/60" />
                      <span>
                        <span className="font-medium">Quantity:</span>
                        {item.quantity}
                      </span>
                    </div>
                  )}
                  {item.pickupTime && (
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-accent/60" />
                      <span>
                        <span className="font-medium">Pickup Time:</span>{" "}
                        {new Date(item.pickupTime).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral">
                  <span className=" text-xs font-medium text-accent">
                    Ready for Pickup
                  </span>
                  <button
                    onClick={() => confirmPickup.mutate(item.donationId)}
                    className="px-4 py-2 rounded-lg cursor-pointer text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors"
                  >
                    Confirm Pickup
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPickup;
