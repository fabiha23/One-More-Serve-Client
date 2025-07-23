import React from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const RequestDonationModal = ({ donation,charityInfo, closeModal, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/donation-requests', {
        ...data,
        status: 'Pending',
        donationId: donation._id,
      });
      Swal.fire('Requested!', 'Your donation request has been sent.', 'success');
      closeModal();
      reset();
      refetch?.();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <dialog id="request_donation_modal" className="modal" open>
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-4">Request Donation</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Donation Title */}
          <div>
            <label className="label font-semibold">Donation Title</label>
            <input
              {...register('donationTitle')}
              value={donation?.title}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Restaurant Name */}
          <div>
            <label className="label font-semibold">Restaurant Name</label>
            <input
              {...register('restaurantName')}
              value={donation?.restaurantName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Charity Name */}
          <div>
            <label className="label font-semibold">Charity Name</label>
            <input
              {...register('charityName')}
              value={charityInfo?.organizationName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Charity Email */}
          <div>
            <label className="label font-semibold">Charity Email</label>
            <input
              {...register('charityEmail')}
              value={charityInfo?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Request Description */}
          <div>
            <label className="label font-semibold">Request Description</label>
            <textarea
              {...register('requestDescription')}
              placeholder="Write your reason for requesting this donation..."
              required
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Preferred Pickup Time */}
          <div>
            <label className="label font-semibold">Preferred Pickup Time</label>
            <input
              type="datetime-local"
              {...register('pickupTime')}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={closeModal} className="btn">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestDonationModal;
