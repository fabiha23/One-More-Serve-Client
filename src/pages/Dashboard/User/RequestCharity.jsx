import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import useAuth from "../../../hooks/useAuth";
import Payment from "../Payment/Payment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaHandsHelping, FaRegEdit, FaCheckCircle } from "react-icons/fa";

const RequestCharity = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [organizationName, setOrganizationName] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [newRequestData, setNewRequestData] = useState(null);
  const paymentAmount = 25; // fixed amount

  // Fetch existing requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charity-role-request", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/roleRequests?email=${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const pendingRequest = requests.find((req) => req.status === "pending");
  const approvedRequest = requests.find((req) => req.status === "approved");
  const rejectedRequest = requests.find((req) => req.status === "rejected");

  // Create role request mutation
  const { mutate, isLoading: isPendingSubmit } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post("/roleRequests", formData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Request Sent",
        text: "Your request has been sent for approval.",
        icon: "success",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE"
      });
      queryClient.invalidateQueries({
        queryKey: ["charity-role-request", user?.email],
      });
      setIsPaymentModalOpen(false);
      setOrganizationName("");
      setMissionStatement("");
      setNewRequestData(null);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE"
      });
    },
  });

  if (isLoading) return <Loading />;

  // Block form if pending or approved request exists
  if (pendingRequest || approvedRequest) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-base-100 rounded-xl shadow-md border border-secondary/20">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
            <FaCheckCircle className="text-secondary text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-accent mb-2">
            {approvedRequest ? "Request Approved" : "Request Pending"}
          </h3>
          <p className="text-accent/80 mb-4">
            {approvedRequest 
              ? "Your charity role request has been approved. You can now access charity features."
              : "Your request is currently under review. Please wait for admin approval."}
          </p>
          {approvedRequest && (
            <button 
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Refresh to Access Features
            </button>
          )}
        </div>
      </div>
    );
  }

  // Handle Pay button click
  const handlePayClick = (e) => {
    e.preventDefault();

    if (!organizationName.trim() || !missionStatement.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all required fields.",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE"
      });
      return;
    }

    const requestPayload = {
      email: user.email,
      name: user.displayName,
      organizationName,
      missionStatement,
      paymentAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setNewRequestData(requestPayload);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (transactionId) => {
    if (!newRequestData) return;
    mutate({ ...newRequestData, transactionId });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-base-100 flex items-center gap-2">
          <FaHandsHelping /> Request Charity Role
        </h1>
      </div>

      {rejectedRequest && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded text-red-700 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaRegEdit className="h-5 w-5 text-red-700" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold mb-1">
                Your previous request was rejected
              </h3>
              <p className="text-sm">
                You can edit the details below and resubmit your Charity Role request.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        <form className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-accent mb-1">Name</label>
              <input
                type="text"
                readOnly
                value={user.displayName}
                className="input input-bordered w-full bg-base-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-1">Email</label>
              <input
                type="email"
                readOnly
                value={user.email}
                className="input input-bordered w-full bg-base-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-accent mb-1">Organization Name *</label>
            <input
              type="text"
              required
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your organization name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-accent mb-1">Mission Statement *</label>
            <textarea
              required
              value={missionStatement}
              onChange={(e) => setMissionStatement(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Describe your organization's mission and goals"
            />
          </div>

          <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <label className="block text-sm font-medium text-accent mb-1">Payment Information</label>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-secondary">${paymentAmount}</p>
                <p className="text-xs text-accent/60">One-time verification fee</p>
              </div>
              <div className="text-xs text-accent/60">
                Secure payment processing
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={handlePayClick}
            disabled={isPendingSubmit}
            className="btn btn-primary w-full mt-4"
          >
            {isPendingSubmit ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>
      </div>

      {isPaymentModalOpen && (
        <Payment
          amount={paymentAmount}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          isOpen={true}
        />
      )}
    </div>
  );
};

export default RequestCharity;