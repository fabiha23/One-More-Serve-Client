import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaHeart,
  FaRegHeart,
  FaUtensils,
  FaMapMarkerAlt,
  FaTrash,
  FaInfoCircle,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaTruck,
} from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch favorites of current user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation to remove a favorite by ID
  const removeFavoriteMutation = useMutation({
    mutationFn: async (favoriteId) => {
      await axiosSecure.delete(`/favorites/${favoriteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]);
      Swal.fire({
        title: "Removed!",
        text: "This donation has been removed from your favorites.",
        icon: "success",
        background: "var(--color-base-100)",
        confirmButtonColor: "var(--color-primary)",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: "This donation will be removed from your favorites list.",
      icon: "question",
      background: "var(--color-base-100)",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-neutral)",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        removeFavoriteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-base-100 flex items-center gap-2">
              <FaHeart /> Favorite Donations
            </h1>
            {favorites.length > 0 && (
              <Link
                to="/all-donations"
                className="btn btn-secondary text-base-100 hover:bg-secondary/90"
              >
                Browse More Donations
              </Link>
            )}
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-8 text-center border border-neutral">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <FaRegHeart className="text-accent text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-accent mb-2">
            No favorites yet
          </h3>
          <p className="text-accent/70 max-w-md mx-auto mb-6">
            Save your favorite donations to easily find them later.
          </p>
          <Link to="/all-donations" className="btn btn-primary text-base-100">
            Browse Donations
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral hover:shadow-md transition-all group"
            >
              {/* Donation Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={fav.donationImage || "/default-food.jpg"}
                  alt={fav.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  {fav.status === "pending" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <FaClock className="mr-1" /> Pending
                    </span>
                  )}
                  {fav.status === "verified" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FaCheckCircle className="mr-1" /> Available
                    </span>
                  )}
                  {fav.status === "picked up" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FaTruck className="mr-1" /> Picked Up
                    </span>
                  )}
                  {fav.status === "requested" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <FiLoader className="mr-1" /> Requested
                    </span>
                  )}
                </div>
              </div>

              {/* Donation Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-accent mb-3 flex items-center">
                  <FaUtensils className="mr-2 text-primary" />
                  {fav.donationTitle}
                </h3>

                <div className="space-y-3 text-sm text-accent/80 mb-5">
                  <div className="flex items-center">
                    <FaBoxOpen className="mr-2 text-primary" />
                    <span>
                      <span className="font-medium">Qty:</span> {fav.quantity}
                      {fav.quantityUnit}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>
                      <span className="font-medium">Restaurant:</span>
                      {fav.restaurantName}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>
                      <span className="font-medium">Location:</span>
                      {fav.location}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-neutral">
                  <Link
                    to={`/donations/${fav.donationId}`}
                    className="btn btn-sm btn-primary btn-outline hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    <FaInfoCircle className="mr-2 text-xs" />
                    View Details
                  </Link>

                  <button
                    onClick={() => handleRemove(fav._id)}
                    className="btn btn-sm btn-error btn-outline hover:bg-error hover:text-white transition-colors duration-200"
                    disabled={removeFavoriteMutation.isLoading}
                  >
                    {removeFavoriteMutation.isLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <FaTrash className="mr-2 text-xs" />
                        Remove
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
