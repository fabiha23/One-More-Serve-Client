import React from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const AddReviewModal = ({ donationId, reviewerName, closeModal, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/reviews', {
        ...data,
        donationId,
        reviewerName,
      });
      Swal.fire('Success', 'Review submitted!', 'success');
      closeModal();
      reset();
      refetch?.();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <dialog id="add_review_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Review</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <input {...register('rating')} type="number" min="1" max="5" placeholder="Rating (1-5)" required className="input input-bordered w-full" />
          <textarea {...register('description')} placeholder="Review Description" required className="textarea textarea-bordered w-full" />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={closeModal} className="btn">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddReviewModal;
