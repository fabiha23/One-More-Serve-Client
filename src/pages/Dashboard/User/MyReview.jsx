import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaUtensils, FaStore, FaCalendarAlt, FaComment } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your review has been removed.",
          icon: "success",
          background: "#FEFAE0",
          confirmButtonColor: "#CCD5AE"
        });
        refetch();
      } else {
        Swal.fire({
          title: "Error",
          text: "Review could not be deleted.",
          icon: "error",
          background: "#FEFAE0",
          confirmButtonColor: "#f43f5e"
        });
      }
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Something went wrong while deleting.",
        icon: "error",
        background: "#FEFAE0",
        confirmButtonColor: "#f43f5e"
      });
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      background: "#FEFAE0",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Reviews</h1>
        </div>
      </div>
      
      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {reviews.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaComment className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">No reviews found</h3>
            <p className="text-accent/70">When you submit reviews, they'll appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaUtensils className="mr-2" /> Food Item
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaStore className="mr-2" /> Restaurant
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" /> Date
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Review
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {review.donationTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {review.restaurantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-accent">
                      <div className="line-clamp-2">
                        {review.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-sm btn-error text-white hover:brightness-110"
                        disabled={deleteMutation.isLoading}
                      >
                        {deleteMutation.isLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <FaTrash className="mr-1" /> Delete
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyReview;