import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRoleRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure=useAxiosSecure()

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
      Swal.fire("Success", "Role request updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["roleRequests"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role request", "error");
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
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, email, status: "rejected" });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <div className="alert alert-error">Error loading requests.</div>;

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Charity Role Requests</h2>

      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="text-gray-500">No role requests found</div>
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id}>
                  <td className="font-medium">{req.name}</td>
                  <td>{req.email}</td>
                  <td>
                    <div>{req.organizationName}</div>
                    <div className="text-xs opacity-70 line-clamp-2" title={req.missionStatement}>
                      {req.missionStatement}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${req.status === "pending" ? "badge-warning" : req.status === "approved" ? "badge-success" : "badge-error"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(req._id, req.email)}
                          className="btn btn-success btn-sm"
                          disabled={updateStatusMutation.isLoading}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id, req.email)}
                          className="btn btn-error btn-sm"
                          disabled={updateStatusMutation.isLoading}
                        >
                          Reject
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
      <div className="md:hidden space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No role requests found</div>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">{req.name}</h3>
                <div className="space-y-2">
                  <p><span className="font-semibold">Email:</span> {req.email}</p>
                  <p><span className="font-semibold">Organization:</span> {req.organizationName}</p>
                  <p><span className="font-semibold">Mission:</span> {req.missionStatement}</p>
                  <p><span className="font-semibold">Transaction ID:</span> {req.transactionId}</p>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Status:</span>
                    <span className={`badge ${req.status === "pending" ? "badge-warning" : req.status === "approved" ? "badge-success" : "badge-error"}`}>
                      {req.status}
                    </span>
                  </div>
                </div>
                {req.status === "pending" && (
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleApprove(req._id, req.userId)}
                      className="btn btn-success btn-sm"
                      disabled={updateStatusMutation.isLoading}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id, req.email)}
                      className="btn btn-error btn-sm"
                      disabled={updateStatusMutation.isLoading}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageRoleRequests;