import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";

const ReviewSection = ({ donationId }) => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", donationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${donationId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating ? (
        <FaStar key={i} className="text-yellow-400 inline-block" />
      ) : (
        <FaRegStar key={i} className="text-yellow-400 inline-block" />
      )
    ));
  };

  return (
    <div className="pb-8">
        <div className="border-b border-neutral pb-6 mb-8">
          <h2 className="text-3xl font-bold text-accent">Reviews</h2>
          {reviews.length > 0 && (
            <div className="mt-2 flex items-center">
              <div className="flex items-center mr-4">
                {renderStars(Math.round(averageRating))}
                <span className="ml-2 text-accent font-medium">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-accent/70">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-lg">
            <p className="text-accent/70 text-lg">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-base-100 p-6 rounded-xl shadow-sm border border-neutral hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {review.reviewerImage ? (
                      <img
                        src={review.reviewerImage}
                        alt={review.reviewerName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-accent/50" />
                    )}
                    <div>
                      <h4 className="font-semibold text-lg text-accent">
                        {review.reviewerName}
                      </h4>
                      <p className="text-sm text-accent/50">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="mt-4 pl-16">
                  <p className="text-accent leading-relaxed">
                    {review.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default ReviewSection;