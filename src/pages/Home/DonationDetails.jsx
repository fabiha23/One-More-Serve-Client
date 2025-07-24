import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaUtensils,
  FaStore,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaHeart,
  FaRegHeart,
  FaInfoCircle,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading";
import useRole from "../../hooks/UseRole";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import AddReviewModal from "./AddReviewModal";
import ReviewSection from "./ReviewSection";
import RequestDonationModal from "./RequestDonationModal";

const DonationDetails = () => {
  const [role, isRoleLoading] = useRole();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  // Fetch donation details
  const {
    data: donation,
    isLoading: donationLoading,
    isError: donationError,
  } = useQuery({
    queryKey: ["donationDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch charity info if user is charity
  const {
    data: charityRequests = [],
    isLoading: charityLoading,
  } = useQuery({
    queryKey: ["charityInfo", user?.email],
    enabled: !!user?.email && role === "charity",
    queryFn: async () => {
      const res = await axiosInstance.get(`/roleRequests?email=${user.email}`);
      return res.data;
    },
  });
  const charityInfo = charityRequests[0] || {};

  // Fetch if donation is favorited
  const {
    data: favorite = [],
    isLoading: favoriteLoading,
  } = useQuery({
    queryKey: ["favorite", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/favorites?donationId=${id}&email=${user.email}`
      );
      return res.data;
    },
  });

  const isFavorite = favorite.length > 0;
  const favoriteId = favorite[0]?._id;

  const favoriteData = {
    userEmail: user?.email,
    donationId: donation?._id,
    donationTitle: donation?.title,
    donationImage: donation?.donationImage,
    restaurantName: donation?.restaurantName,
    location: donation?.location,
    status: donation?.status,
    quantity: donation?.quantity,
    quantityUnit: donation?.quantityUnit,
  };

  const addFavorite = useMutation({
    mutationFn: () => axiosInstance.post("/favorites", favoriteData),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite", id, user?.email]);
      Swal.fire({
        icon: "success",
        title: "Added to Favorites",
        text: `"${donation?.title}" has been added to your favorites.`,
        timer: 3000,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: () => axiosInstance.delete(`/favorites/${favoriteId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite", id, user?.email]);
      Swal.fire({
        icon: "success",
        title: "Removed from Favorites",
        showConfirmButton: false,
        position: "top-end",
        timer: 3000,
        toast: true,
      });
    },
  });

  if (donationLoading || isRoleLoading || charityLoading || favoriteLoading)
    return <Loading />;
  if (donationError)
    return (
      <div className="text-center mt-10 text-red-600">
        Error loading donation details.
      </div>
    );

  return (
    <div className="pt-10">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="card bg-base-200 shadow-lg rounded-xl p-6 flex flex-col lg:flex-row gap-8">
          {/* Image Left */}
          <div className="flex-shrink-0 w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={donation?.donationImage}
              alt={donation?.title}
              className="w-full h-104 object-cover"
            />
            {(role === "user" || role === "charity") && (
              <button
                onClick={() =>
                  isFavorite
                    ? removeFavorite.mutate()
                    : addFavorite.mutate()
                }
                className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost bg-white/90"
                aria-label="Toggle Favorite"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
              </button>
            )}
          </div>

          {/* Details Right */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{donation?.title}</h1>
              <div className="divider my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <DetailItem
                  icon={<FaUtensils />}
                  label="Food Type"
                  value={donation?.foodType || "N/A"}
                />
                <DetailItem
                  icon={<FaWeightHanging />}
                  label="Quantity"
                  value={`${donation?.quantity ?? "-"} ${donation?.quantityUnit || ""}`}
                />
                <DetailItem
                  icon={<FaStore />}
                  label="Restaurant"
                  value={donation?.restaurantName || "N/A"}
                />
                <DetailItem
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={donation?.location || "N/A"}
                />
                <DetailItem
                  icon={<FaCalendarAlt />}
                  label="Pickup Window"
                  value={donation?.pickupTime || "N/A"}
                />
                <DetailItem
                  icon={<FaInfoCircle />}
                  label="Status"
                  value={
                    <span
                      className={`badge ${
                        donation?.status === "Available" ||
                        donation?.status === "Verified"
                          ? "badge-success"
                          : donation?.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {donation?.status === "Verified"
                        ? "Available"
                        : donation?.status || "Unknown"}
                    </span>
                  }
                />
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700">
                  {donation?.description || "No additional description provided"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-auto">
              {role === "charity" && (
                <button
                  onClick={() => setRequestModalOpen(true)}
                  className="btn btn-primary"
                >
                  Request Donation
                </button>
              )}
              {(role === "charity" || role === "user") && (
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="btn btn-secondary"
                >
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-10 mt-12">
          <ReviewSection donationId={id} />
        </div>

        {/* Modals */}
        {isReviewModalOpen && (
          <AddReviewModal
            isOpen={isReviewModalOpen}
            donationId={id}
            reviewerName={user?.displayName}
            reviewerEmail={user?.email}
            reviewerImage={user?.photoURL}
            donationTitle={donation?.title}
            restaurantName={donation?.restaurantName}
            closeModal={() => setReviewModalOpen(false)}
            refetch={() => queryClient.invalidateQueries(["donationDetails", id])}
          />
        )}

        {isRequestModalOpen && (
          <RequestDonationModal
            isOpen={isRequestModalOpen}
            closeModal={() => setRequestModalOpen(false)}
            donation={donation}
            charityInfo={charityInfo}
            user={user}
            refetch={() => queryClient.invalidateQueries(["donationDetails", id])}
          />
        )}
      </div>
    </div>
  );
};

// Helper DetailItem component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-primary mt-1">{icon}</div>
    <div>
      <p className="font-semibold text-gray-600">{label}</p>
      <p>{value}</p>
    </div>
  </div>
);

export default DonationDetails;
