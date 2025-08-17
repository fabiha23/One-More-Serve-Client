import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaCheck,
  FaTimes,
  FaUtensils,
  FaHandsHelping,
  FaClock,
  FaCalendarAlt,
  FaBox,
} from "react-icons/fa";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestedDonations = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantDonationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donationRequests?restaurantEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donationRequests/${id}`, { status: newStatus });
      Swal.fire({
        title: "Success",
        text: `Request ${newStatus} successfully`,
        icon: "success",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      queryClient.invalidateQueries([
        "restaurantDonationRequests",
        user?.email,
      ]);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update request status",
        icon: "error",
        background: "#FEFAE0",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">
            Requested Donations
          </h1>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {requests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaBox className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">
              No donation requests
            </h3>
            <p className="text-accent/70">
              When charities request your donations, they'll appear here for
              approval.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaUtensils className="mr-2" /> Donation
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Food Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaHandsHelping className="mr-2" /> Charity
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" /> Pickup Time
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent font-medium">
                      {req.donationTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {req.foodType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {req.charityName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {new Date(req.pickupTime).toLocaleString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          req.status === "accepted"
                            ? "bg-primary/30 text-accent border border-primary"
                            : req.status === "rejected"
                            ? "bg-error/10 text-error border border-error/20"
                            : "bg-secondary/30 text-accent border border-secondary"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {req.status === "pending" && <FaClock size={12} />}
                          {req.status === "accepted" && <FaCheck size={12} />}
                          {req.status === "rejected" && <FaTimes size={12} />}
                          {req.status}
                        </div>
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {req.status === "pending" ? (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "accepted")
                            }
                            className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors flex items-center"
                          >
                            <FaCheck className="mr-1" /> Accept
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "rejected")
                            }
                            className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center border border-error/20"
                          >
                            <FaTimes className="mr-1" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-accent/50 italic">
                          No actions
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default RequestedDonations;
