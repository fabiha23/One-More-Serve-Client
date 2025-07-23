import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const Favorites = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch favorites of current user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation to remove a favorite by ID
  const removeFavoriteMutation = useMutation({
    mutationFn: async (favoriteId) => {
      await axiosInstance.delete(`/favorites/${favoriteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]);
      Swal.fire({
          icon: "success",
          title: "Removed from Favorites",
          showConfirmButton: false,
          position:"top-end",
          timer: 3000,
          toast: true
        });
    },
  });

  if (isLoading) return <Loading />;

  if (!favorites.length)
    return (
      <div className="text-center mt-20 text-gray-500">
        No favorites saved yet.
      </div>
    );

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <h2 className="text-3xl font-bold mb-8">Your Favorite Donations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <div
            key={fav._id}
            className="card bg-base-200 shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={fav.donationImage}
              alt={fav.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-1">{fav.title}</h3>
              <p className="text-gray-700 mb-1">
                <strong>Restaurant:</strong> {fav.restaurantName} - {fav.location}
              </p>
              <p className="mb-1">
                <strong>Status:</strong>
                <span
                  className={`badge ${
                    fav.status === "Available"
                      ? "badge-success"
                      : fav.status === "Pending"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {fav.status}
                </span>
              </p>
              <p className="mb-4">
                <strong>Quantity:</strong> {fav.quantity} {fav.quantityUnit}
              </p>

              <div className="mt-auto flex justify-between">
                <button
                  onClick={() => navigate(`/donations/${fav.donationId}`)}
                  className="btn btn-sm btn-primary"
                >
                  Details
                </button>
                <button
                  onClick={() => removeFavoriteMutation.mutate(fav._id)}
                  className="btn btn-sm btn-error"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
