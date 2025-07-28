import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const axiosSecure=useAxiosSecure()

  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/donationRequests?charityEmail=${user?.email}`);
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
      });
      queryClient.invalidateQueries(["myDonationRequests", user?.email]);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">My Requests</h2>

      {myRequests.length === 0 ? (
        <p className="text-center text-accent">You haven’t made any donation requests yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRequests.map((req) => (
            <div key={req._id} className="card bg-base-100 border border-base-200 shadow">
              <div className="card-body">
                <h3 className="card-title text-lg text-primary">{req.donationTitle}</h3>
                <p className="text-sm text-accent">From: {req.restaurantName}</p>

                <div className="mt-2 space-y-1 text-sm text-accent">
                  <p><strong>Food Type:</strong> {req.foodType}</p>
                  <p><strong>Quantity:</strong> {req.quantity}</p>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span className={`badge ${
                    req.status === "accepted"
                      ? "badge-success"
                      : req.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}>
                    {req.status}
                  </span>

                  {req.status === "pending" && (
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyRequests;
