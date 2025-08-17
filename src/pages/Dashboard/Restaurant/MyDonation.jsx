import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaUtensils,
  FaBox,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaTruck,
  FaTruckLoading,
} from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiLoader } from "react-icons/fi";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch donations for the current restaurant
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["restaurant-donations", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/donations?restaurantEmail=${user?.email}`
      );
      return data.donations;
    },
    enabled: !!user?.email,
  });

  // Delete donation mutation
  const { mutate: deleteDonation, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/donations/${id}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your donation has been deleted.",
        icon: "success",
        background: "var(--color-base-100)",
        confirmButtonColor: "var(--color-primary)",
      });
      queryClient.invalidateQueries({
        queryKey: ["restaurant-donations", user?.email],
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        background: "var(--color-base-100)",
        confirmButtonColor: "var(--color-error)",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      background: "var(--color-base-100)",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-neutral)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        deleteDonation(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-base-100">My Donations</h1>
            {donations.length > 0 && (
              <Link
                to="/dashboard/add-donation"
                className="btn btn-secondary text-base-100 hover:bg-secondary/90"
              >
                <FaPlus className="mr-2" /> Add New Donation
              </Link>
            )}
          </div>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-8 text-center border border-neutral">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <FaUtensils className="text-accent text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-accent mb-2">
            No donations yet
          </h3>
          <p className="text-accent/70 max-w-md mx-auto mb-6">
            Start by adding your first food donation to help those in need.
          </p>
          <Link
            to="/dashboard/add-donation"
            className="btn btn-primary text-base-100"
          >
            <FaPlus className="mr-2" /> Add Donation
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral hover:shadow-md transition-all"
            >
              {/* Donation Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={donation.donationImage || "/default-food.jpg"}
                  alt={donation.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  {donation.status === "pending" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <FaClock className="mr-1" /> Pending
                    </span>
                  )}
                  {donation.status === "verified" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FaCheckCircle className="mr-1" /> Verified
                    </span>
                  )}
                  {donation.status === "picked up" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FaTruck className="mr-1" /> Picked Up
                    </span>
                  )}
                  {donation.status === "rejected" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <FaTimesCircle className="mr-1" /> Rejected
                    </span>
                  )}
                  {donation.status === "requested" && (
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
                  {donation.title}
                </h3>

                <div className="space-y-3 text-sm text-accent/80 mb-5">
                  <div className="flex items-center">
                    <FaBox className="mr-2 text-primary" />
                    <span>
                      <span className="font-medium">Type:</span>
                      {donation.foodType}
                      <span className="mx-2 text-neutral">•</span>
                      <span className="font-medium">Qty:</span>
                      {donation.quantity} {donation.quantityUnit}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary" />
                    <span>
                      <span className="font-medium">Pickup:</span>
                      {new Date(donation.pickupStart).toLocaleDateString()} -
                      {new Date(donation.pickupEnd).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>
                      <span className="font-medium">Location:</span>
                      {donation.location}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-neutral">
                  {donation.status !== "rejected" && (
                    <Link
                      to={`/dashboard/update-donation/${donation._id}`}
                      state={{ donation }}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="btn btn-sm btn-outline btn-error"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FaTrash className="mr-1" /> Delete
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

export default MyDonations;