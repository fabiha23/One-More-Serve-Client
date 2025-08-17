import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUtensils,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaBoxOpen,
  FaBox,
} from "react-icons/fa";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donationRequests?charityEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#e2e8f0",
      background: "#FEFAE0",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/donationRequests/${id}`);
      Swal.fire({
        icon: "success",
        title: "Request canceled",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
        background: "#FEFAE0",
      });
      queryClient.invalidateQueries(["myDonationRequests", user?.email]);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Requests</h1>
        </div>
      </div>

      {myRequests.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-8 text-center border border-neutral">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <FaBoxOpen className="text-accent text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-accent mb-2">
            No active requests
          </h3>
          <p className="text-accent/70 max-w-md mx-auto">
            When you request food donations from restaurants, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRequests.map((req) => (
            <div
              key={req._id}
              className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral hover:shadow-md transition-all"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-accent">
                    {req.donationTitle}
                  </h3>
                  <span
                    className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
                      req.status === "accepted"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : req.status === "picked up"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : req.status === "pending"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {req.status === "accepted"
                      ? "Accepted"
                      : req.status === "picked up"
                      ? "Picked Up"
                      : req.status === "pending"
                      ? "Pending"
                      : "Rejected"}
                  </span>
                </div>

                {/* Restaurant */}
                <div className="flex items-center text-sm text-accent/80 mb-3">
                  <span className="font-medium mr-1">From:</span> {req.restaurantName}
                </div>

                {/* Food Type */}
                <div className="space-y-3 text-sm text-accent/80 mb-6">
                  <div className="flex items-center">
                    <FaUtensils className="mr-2 text-accent/60" />
                    <span>
                      <span className="font-medium">Type:</span> {req.foodType}
                    </span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral">
                  <div className="flex items-center text-sm">
                    {req.status === "pending" ? (
                      <FaClock className="text-secondary mr-1" />
                    ) : req.status === "accepted" || req.status === "picked up" ? (
                      <FaCheckCircle className="text-primary mr-1" />
                    ) : (
                      <FaTimesCircle className="text-error mr-1" />
                    )}
                    <span className="text-accent/70">
                      {req.status === "pending"
                        ? "Under review"
                        : req.status === "accepted"
                        ? "Ready for pickup"
                        : req.status === "picked up"
                        ? "Successfully collected"
                        : "Request declined"}
                    </span>
                  </div>

                  {req.status === "pending" && (
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="text-error cursor-pointer hover:text-error/80 text-sm font-medium flex items-center"
                    >
                      <FaTrash className="mr-1" />
                      Remove
                    </button>
                  )}
                </div>

                {/* Decline Reason */}
                {req.status === "rejected" && req.declineReason && (
                  <div className="mt-4 p-3 bg-error/10 rounded-lg border border-error/20">
                    <p className="text-xs text-error">
                      <span className="font-medium">Reason:</span> {req.declineReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyRequests;
