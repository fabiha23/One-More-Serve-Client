import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";

const MyPickup = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  // Fetch all requests (Accepted or Picked Up)
  const {
    data: pickups = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donationRequests?charityEmail=${user?.email}&status=Accepted&status=Picked Up`
      );
      return res.data;
    },
  });

  // Confirm Pickup Mutation
  const confirmPickup = useMutation({
    mutationFn: async (donationId) => {
      return await axiosInstance.patch(`/donations/status/${donationId}`, {
        status: "Picked Up",
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Pickup confirmed!", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Could not confirm pickup", "error");
    },
  });

  if (isLoading) return <Loading />;

  // Filter accepted requests only
  const acceptedRequests = pickups.filter((p) => p.status === "Accepted");
  // Check if all are picked up
  const allPickedUp = pickups.length > 0 && acceptedRequests.length === 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Pickups</h2>

      {pickups.length === 0 ? (
        <p className="text-center text-gray-500">No pickups assigned yet.</p>
      ) : allPickedUp ? (
        <p className="text-center text-blue-600 font-semibold">
          Your requests have been picked up. You can see them in the Received Donations page.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {acceptedRequests.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 border border-base-300 p-4 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-1">
                {item.donationTitle}
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Restaurant:</strong> {item.restaurantName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {item.restaurantLocation || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Food Type:</strong> {item.foodType}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Quantity:</strong> {item.quantity || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Pickup Time:</strong>{" "}
                {new Date(item.pickupTime).toLocaleString()}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="badge badge-warning">Assigned</span>
                <button
                  onClick={() => confirmPickup.mutate(item.donationId)}
                  className="btn btn-sm btn-success text-white"
                >
                  Confirm Pickup
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickup;
