import React from "react";
import { useForm } from "react-hook-form";
import {
  FaUtensils,
  FaStore,
  FaHandsHelping,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const RequestDonationModal = ({
  donation,
  charityInfo,
  user,
  closeModal,
  refetch,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/donationRequests", {
        ...data,
        status: "Pending",
        donationId: donation?._id,
        foodType: donation?.foodType,
        charityImage:user?.photoURL
      });
      await axiosInstance.patch(`/donations/status/${donation._id}`, {
        status: "Requested",
      });
      Swal.fire(
        "Requested!",
        "Your donation request has been sent.",
        "success"
      );
      closeModal();
      reset();
      refetch();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <dialog
      id="request_donation_modal"
      className="modal modal-bottom sm:modal-middle"
      open
    >
      <div className="modal-box max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-2xl">Request Donation</h3>
          <button onClick={closeModal} className="btn btn-circle btn-sm">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {/* Donation Title */}
                <tr>
                  <td className="font-semibold flex items-center gap-2">
                    <FaUtensils className="text-primary" /> Donation Title
                  </td>
                  <td>
                    <input
                      {...register("donationTitle")}
                      value={donation?.title}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </td>
                </tr>

                {/* Restaurant Name */}
                <tr>
                  <td className="font-semibold flex items-center gap-2">
                    <FaStore className="text-primary" /> Restaurant
                  </td>
                  <td>
                    <input
                      {...register("restaurantName")}
                      value={donation?.restaurantName}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </td>
                </tr>

                {/* Charity Name */}
                <tr>
                  <td className="font-semibold flex items-center gap-2">
                    <FaHandsHelping className="text-primary" /> Charity
                  </td>
                  <td>
                    <input
                      {...register("charityName")}
                      value={
                        charityInfo?.organizationName || user?.displayName
                      }
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </td>
                </tr>

                {/* Charity Email */}
                <tr>
                  <td className="font-semibold flex items-center gap-2">
                    <FaEnvelope className="text-primary" /> Charity Email
                  </td>
                  <td>
                    <input
                      {...register("charityEmail")}
                      value={user?.email}
                      readOnly
                      className="input input-bordered w-full"
                    />
                  </td>
                </tr>

                {/* Request Description */}
                <tr>
                  <td className="font-semibold">Request Description</td>
                  <td>
                    <textarea
                      {...register("requestDescription")}
                      placeholder="Write your reason for requesting this donation..."
                      required
                      className="textarea textarea-bordered w-full"
                      rows={3}
                    />
                  </td>
                </tr>

                {/* Preferred Pickup Time */}
                <tr>
                  <td className="font-semibold flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" /> Pickup Time
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      {...register("pickupTime")}
                      required
                      className="input input-bordered w-full"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="modal-action mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDonationModal;
