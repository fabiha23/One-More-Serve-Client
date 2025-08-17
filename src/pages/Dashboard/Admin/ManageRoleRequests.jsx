import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaBuilding, FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";

const ManageRoleRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch all role requests
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/roleRequests");
      return res.data;
    },
  });

  // Mutation to update role request status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, email, status }) => {
      await axiosSecure.patch(`/roleRequests/${id}`, { status });

      if (status === "approved") {
        await axiosSecure.patch(`/users/role?email=${email}`, { role: "charity" });
      }
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Role request updated successfully",
        icon: "success",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE"
      });
      queryClient.invalidateQueries({ queryKey: ["roleRequests"] });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to update role request",
        icon: "error",
        background: "#FEFAE0",
        confirmButtonColor: "#f43f5e"
      });
    },
  });

  const handleApprove = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Approve this Charity role request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
      background: "#FEFAE0",
      confirmButtonColor: "#CCD5AE",
      cancelButtonColor: "#f43f5e"
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, email, status: "approved" });
      }
    });
  };

  const handleReject = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this Charity role request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
      background: "#FEFAE0",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#CCD5AE"
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, email, status: "rejected" });
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="alert alert-error bg-error/10 text-error border border-error/20">Error loading requests.</div>;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Manage Charity Role Requests</h1>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> User
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" /> Email
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaBuilding className="mr-2" /> Organization
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
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                      <FaInfoCircle className="text-accent text-3xl" />
                    </div>
                    <h3 className="text-xl font-medium text-accent mb-2">No role requests found</h3>
                    <p className="text-accent/70">When users request charity roles, they'll appear here.</p>
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent font-medium">
                      {req.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {req.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-accent">
                      <div className="font-medium">{req.organizationName}</div>
                      <div className="text-xs opacity-70 line-clamp-2" title={req.missionStatement}>
                        {req.missionStatement}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === "pending"
                          ? "bg-primary/30 text-accent border border-primary"
                          : req.status === "approved"
                          ? "bg-secondary/30 text-accent border border-secondary"
                          : "bg-error/10 text-error border border-error/20"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {req.status === "pending" && (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove(req._id, req.email)}
                            className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors flex items-center"
                            disabled={updateStatusMutation.isLoading}
                          >
                            <FaCheck className="mr-1" /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(req._id, req.email)}
                            className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center border border-error/20"
                            disabled={updateStatusMutation.isLoading}
                          >
                            <FaTimes className="mr-1" /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (shown on mobile) */}
        <div className="md:hidden space-y-4 p-4">
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                <FaInfoCircle className="text-accent text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-accent mb-2">No role requests found</h3>
              <p className="text-accent/70">When users request charity roles, they'll appear here.</p>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req._id} className="bg-base-100 rounded-lg shadow-sm border border-neutral p-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaUser className="text-accent mr-2" />
                    <span className="font-medium text-accent">{req.name}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-accent mr-2" />
                    <span className="text-accent">{req.email}</span>
                  </div>
                  <div className="flex items-start">
                    <FaBuilding className="text-accent mr-2 mt-1" />
                    <div>
                      <div className="font-medium text-accent">{req.organizationName}</div>
                      <div className="text-xs text-accent/70">{req.missionStatement}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-accent mr-2">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === "pending"
                        ? "bg-primary/30 text-accent border border-primary"
                        : req.status === "approved"
                        ? "bg-secondary/30 text-accent border border-secondary"
                        : "bg-error/10 text-error border border-error/20"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </div>
                {req.status === "pending" && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleApprove(req._id, req.email)}
                      className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors flex items-center"
                      disabled={updateStatusMutation.isLoading}
                    >
                      <FaCheck className="mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id, req.email)}
                      className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center border border-error/20"
                      disabled={updateStatusMutation.isLoading}
                    >
                      <FaTimes className="mr-1" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageRoleRequests;