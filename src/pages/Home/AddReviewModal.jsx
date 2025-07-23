import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const AddReviewModal = ({
  isOpen,
  donationId,
  reviewerName,
  reviewerEmail,
  donationTitle,
  restaurantName,
  reviewerImage,
  closeModal,
  refetch,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosInstance = useAxios();

  // State to track star rating
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const onSubmit = async (formData) => {
    try {
      // Use star rating from state
      const reviewPayload = {
        rating: rating,
        description: formData.description,
        donationId,
        reviewerName,
        reviewerEmail,
        donationTitle,
        reviewerImage,
        restaurantName,
      };

      await axiosInstance.post("/reviews", reviewPayload);
      Swal.fire("Success", "Review submitted!", "success");
      closeModal();
      reset();
      setRating(0);
      refetch?.();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="add_review_modal" className="modal" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add Review</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Star Rating */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none cursor-pointer"
                aria-label={`${star} Star`}
              >
                <FaStar
                  size={30}
                  color={star <= (hover || rating) ? "#FFC107" : "#E4E5E9"}
                />
              </button>
            ))}
          </div>

          {/* Hidden input for react-hook-form */}
          <input
            type="hidden"
            {...register("rating", { required: true })}
            value={rating}
          />

          {/* Description */}
          <textarea
            {...register("description", { required: true })}
            placeholder="Review Description"
            className="textarea textarea-bordered w-full"
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={rating === 0}>
              Submit
            </button>
            <button type="button" onClick={closeModal} className="btn">
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddReviewModal;
