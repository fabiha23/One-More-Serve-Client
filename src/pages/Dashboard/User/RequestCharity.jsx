import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Payment from "../Payment/Payment";

const RequestCharity = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [organizationName, setOrganizationName] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [newRequestData, setNewRequestData] = useState(null);

  const paymentAmount = 25; // fixed amount placeholder

  // Fetch existing role request to block duplicates
  const { data: existingRequest, isLoading } = useQuery({
    queryKey: ["charity-role-request", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/roleRequests?email=${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  const { mutate, isLoading: isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post("/roleRequests", formData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Request Sent",
        text: "Your request has been sent for approval.",
        icon: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["charity-role-request", user?.email],
      });
      setIsPaymentModalOpen(false);
      // reset form
      setOrganizationName("");
      setMissionStatement("");
      setNewRequestData(null);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    },
  });

  if (isLoading) return <Loading />;

  if (existingRequest && existingRequest.status === "pending") {
    return (
      <div className="p-6 bg-base-100 rounded-lg shadow text-center">
        <h3 className="text-lg font-semibold mb-2">
          You already have a pending or Charity Role request.
        </h3>
        <p>Please wait for admin approval or contact support for assistance.</p>
      </div>
    );
  }

  // Open modal on Pay click
  const handlePayClick = (e) => {
    e.preventDefault();

    if (!organizationName.trim() || !missionStatement.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    setNewRequestData({
      email: user.email,
      name: user.displayName,
      organizationName,
      missionStatement,
      paymentAmount,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
    setIsPaymentModalOpen(true);
  };

  // After successful payment, submit the request to backend
  const handlePaymentSuccess = (transactionId) => {
    if (!newRequestData) return;
    mutate({ ...newRequestData, transactionId });
  };

  return (
  <div>
    <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg px-6">
      Request Charity Role
    </h2>

    {/* Handle rejected state message inline */}
    {existingRequest?.status === "rejected" && (
      <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700 mb-4">
        <h3 className="text-lg font-semibold mb-1">Your previous request was rejected.</h3>
        <p>You can edit the details below and resubmit your Charity Role request.</p>
      </div>
    )}

    <form className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow space-y-4">
      <div>
        <label className="label">Name</label>
        <input
          type="text"
          readOnly
          value={user.displayName}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          readOnly
          value={user.email}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Organization Name</label>
        <input
          type="text"
          required
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">Mission Statement</label>
        <textarea
          required
          value={missionStatement}
          onChange={(e) => setMissionStatement(e.target.value)}
          className="textarea textarea-bordered w-full"
          rows={4}
        />
      </div>
      <div>
        <label className="label">Payment Amount</label>
        <p className="text-lg font-semibold">${paymentAmount}</p>
        <small className="text-gray-500">* Payment processing will be done here.</small>
      </div>
      <button
        type="submit"
        onClick={handlePayClick}
        disabled={isPending}
        className="btn btn-primary w-full"
      >
        {isPending ? "Submitting..." : "Pay"}
      </button>
    </form>

    {/* Payment modal */}
    {isPaymentModalOpen && (
      <Payment
        amount={paymentAmount}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        roleRequestId={newRequestData?.id || null}
        isOpen={true}
      />
    )}
  </div>
);

};

export default RequestCharity;
