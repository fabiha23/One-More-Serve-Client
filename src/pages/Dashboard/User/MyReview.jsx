import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";

const MyReview = () => {
  const { user } = useAuth();
  const axiosInstance=useAxios()

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews?reviewrEmail=${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Your review has been removed.", "success");
        refetch();
      } else {
        Swal.fire("Error", "Review could not be deleted.", "error");
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

   if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className=" py-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">My Reviews</h2>

      {isLoading ? (
        <Loading></Loading>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-400">You haven't written any reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-base-200 border border-base-300 p-5 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-accent">{review.donationTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Restaurant: {review.restaurantName}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                  <p className="text-base">{review.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-sm btn-error text-white mt-1 hover:brightness-110"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReview;
