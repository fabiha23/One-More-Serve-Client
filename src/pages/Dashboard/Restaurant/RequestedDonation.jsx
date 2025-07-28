import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestedDonations = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure=useAxiosSecure()
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantDonationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/donationRequests?restaurantEmail=${user?.email}`);
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donationRequests/${id}`, { status: newStatus });
      Swal.fire({
        icon: "success",
        title: `Request ${newStatus}`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      queryClient.invalidateQueries(["restaurantDonationRequests", user?.email]);
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Requested Donations</h2>

<div className=" overflow-x-auto max-w-full">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Donation Title</th>
                <th>Food Type</th>
                <th>Charity Name</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="whitespace-nowrap">{req.donationTitle}</td>
                  <td>{req.foodType}</td>
                  <td className="whitespace-nowrap">{req.charityName}</td>
                  <td className="whitespace-nowrap">{req.pickupTime}</td>
                  <td>
                    <span className={`badge ${
                      req.status === "pending" ? "badge-warning" :
                      req.status === "accepted" ? "badge-success" :
                      "badge-error"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleStatusUpdate(req._id, "accepted")}
                        disabled={req.status !== "pending"}
                        className="btn btn-xs btn-success"
                        title="Accept"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "rejected")}
                        disabled={req.status !== "pending"}
                        className="btn btn-xs btn-error"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6">
                    No donation requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default RequestedDonations;