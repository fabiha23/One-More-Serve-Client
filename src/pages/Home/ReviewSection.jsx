import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading";

const ReviewSection = ({ donationId }) => {
  const axiosInstance = useAxios();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", donationId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews/${donationId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="my-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500 italic text-center">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.reviewerImage || "/default-avatar.png"}
                    alt={`${review.reviewerName}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-lg">{review.reviewerName}</span>
                </div>
                <div>{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700">{review.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
