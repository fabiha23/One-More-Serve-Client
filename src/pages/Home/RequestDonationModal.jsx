import React from "react";
import { useForm } from "react-hook-form";
import {
  FaUtensils,
  FaStore,
  FaHandsHelping,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestDonationModal = ({
  donation,
  charityInfo,
  user,
  closeModal,
  refetch,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/donationRequests", {
        ...data,
        status: "pending",
        donationId: donation?._id,
        foodType: donation?.foodType,
        charityImage: user?.photoURL
      });
      await axiosSecure.patch(`/donations/status/${donation._id}`, {
        status: "requested",
      });
      Swal.fire({
        title: "Request Sent!",
        text: "Your donation request has been submitted successfully.",
        icon: "success",
        background: "var(--color-base-100)",
        color: "var(--color-accent)",
        confirmButtonColor: "var(--color-primary)",
      });
      closeModal();
      reset();
      refetch();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "var(--color-base-100)",
        color: "var(--color-accent)",
        confirmButtonColor: "var(--color-error)",
      });
    }
  };

  return (
    <dialog
      id="request_donation_modal"
      className="modal modal-bottom sm:modal-middle backdrop:bg-black/50"
      open
    >
      <div className="modal-box max-w-3xl bg-base-100 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-neutral pb-4">
          <h3 className="font-bold text-2xl text-accent">Request Donation</h3>
          <button 
            onClick={closeModal} 
            className="btn btn-circle btn-sm border-2 border-neutral border-none bg-base-200 text-accent"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Donation Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent flex items-center gap-2">
                  <FaUtensils className="text-primary" /> Donation Title
                </span>
              </label>
              <input
                {...register("donationTitle")}
                value={donation?.title}
                readOnly
                className="input input-bordered w-full bg-base-200 text-accent focus:outline-primary"
              />
            </div>

            {/* Restaurant Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent flex items-center gap-2">
                  <FaStore className="text-primary" /> Restaurant
                </span>
              </label>
              <input
                {...register("restaurantName")}
                value={donation?.restaurantName}
                readOnly
                className="input input-bordered w-full bg-base-200 text-accent focus:outline-primary"
              />
            </div>

            {/* Charity Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent flex items-center gap-2">
                  <FaHandsHelping className="text-primary" /> Charity
                </span>
              </label>
              <input
                {...register("charityName")}
                value={charityInfo?.organizationName || user?.displayName}
                readOnly
                className="input input-bordered w-full bg-base-200 text-accent focus:outline-primary"
              />
            </div>

            {/* Charity Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent flex items-center gap-2">
                  <FaEnvelope className="text-primary" /> Charity Email
                </span>
              </label>
              <input
                {...register("charityEmail")}
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-base-200 text-accent focus:outline-primary"
              />
            </div>

            {/* Request Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent">Request Description</span>
              </label>
              <textarea
                {...register("requestDescription")}
                placeholder="Explain why you're requesting this donation and how it will be used..."
                required
                className="textarea textarea-bordered w-full bg-base-200 text-accent focus:outline-primary"
                rows={3}
              />
            </div>

            {/* Preferred Pickup Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-accent flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" /> Preferred Pickup Time
                </span>
              </label>
              <input
                type="datetime-local"
                {...register("pickupTime")}
                required
                className="input input-bordered w-full bg-base-200 text-accent focus:outline-primary"
              />
            </div>
          </div>

          <div className="modal-action mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="btn bg-transparent border border-neutral duration-300 active:scale-95 hover:bg-base-200 text-accent"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn bg-primary hover:bg-primary/90 duration-300 active:scale-95 text-accent border-none"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDonationModal;