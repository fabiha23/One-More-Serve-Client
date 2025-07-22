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
} from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  // Fetch donations for the current restaurant
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["restaurant-donations", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/donations?restaurantEmail=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, // Prevent fetching until user is loaded
  });

  // Delete donation mutation with refetch on success
  const { mutate: deleteDonation, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`/donations/${id}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your donation has been deleted.",
        icon: "success",
        timer: 3000,
        confirmButtonColor: "#10B981",
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
        confirmButtonColor: "#EF4444",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        deleteDonation(id);
      }
    });
  };

  if (isLoading)
    return <div className="text-center py-8">Loading donations...</div>;

  return (
    <div>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg px-6">
        My Donations
      </h2>

      {donations.length === 0 ? (
        <div className="text-center py-12 bg-base-100 rounded-lg shadow">
          <p className="text-lg text-accent">
            You haven't added any donations yet
          </p>
          <Link
            to="/dashboard/add-donation"
            className="btn btn-secondary mt-4 text-base-100"
          >
            <FaPlus className="mr-2" /> Add Your First Donation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Donation Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={donation.donationImage || "/default-food.jpg"}
                  alt={donation.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Donation Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-accent flex items-center">
                    <FaUtensils className="mr-2 text-accent/80" />
                    {donation.title}
                  </h3>
                  <div className="flex items-center">
                    {donation.status === "Pending" && (
                      <span className="badge badge-warning gap-1 py-2">
                        <FaClock size={14} /> Pending
                      </span>
                    )}
                    {donation.status === "Verified" && (
                      <span className="badge badge-success gap-1 py-2">
                        <FaCheckCircle size={14} /> Verified
                      </span>
                    )}
                    {donation.status === "Rejected" && (
                      <span className="badge badge-error gap-1 py-2">
                        <FaTimesCircle size={14} /> Rejected
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <FaBox className="mr-3 text-accent/80 min-w-[16px]" />
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="font-medium">Type:</span>
                      <span>{donation.foodType}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-medium">Qty:</span>
                      <span>
                        {donation.quantity} {donation.quantityUnit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-accent/80 min-w-[16px]" />
                    <div>
                      <span className="font-medium">Pickup:</span>{" "}
                      {new Date(donation.pickupStart).toLocaleDateString()} -{" "}
                      {new Date(donation.pickupEnd).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mr-3 text-accent/80 mt-0.5 min-w-[16px]" />
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {donation.location}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                  {donation.status !== "Rejected" && (
                    <Link
                      to={`/dashboard/update-donation/${donation._id}`}
                      state={{ donation }}
                      className="btn btn-sm btn-outline btn-accent"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="btn btn-sm btn-outline btn-error"
                    disabled={isDeleting}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
