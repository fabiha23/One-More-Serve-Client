import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationDetails = () => {
  const [role, isRoleLoading] = useRole();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch charity info
  const { data: charityRequests = [], isLoading: charityLoading } = useQuery({
    queryKey: ["charityInfo", user?.email],
    enabled: !!user?.email && role === "charity",
    queryFn: async () => {
      const res = await axiosSecure.get(`/roleRequests?email=${user.email}`);
      return res.data;
    },
  });
  const charityInfo = charityRequests[0] || {};

  // Fetch user's favorite status
  const { data: favorite = [], isLoading: favoriteLoading } = useQuery({
    queryKey: ["favorite", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
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
    mutationFn: () => axiosSecure.post("/favorites", favoriteData),
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
    mutationFn: () => axiosSecure.delete(`/favorites/${favoriteId}`),
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

  // ✅ Fetch donation requests for this donation to check for accepted one
  const { data: donationRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["donationRequestByDonationId", id],
    enabled: !!id && role === "charity",
    queryFn: async () => {
      const res = await axiosInstance.get(`/donationRequests?donationId=${id}`);
      return res.data;
    },
  });

  const acceptedRequest = donationRequests.find(
    (req) => req.status === "accepted" && req.charityEmail === user?.email
  );

  // ✅ Confirm Pickup mutation
  const markAsPickedUp = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/donations/status/${id}`, { status: "picked up" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["donationDetails", id]);
      Swal.fire("Success", "Marked as picked up", "success");
    },
  });

  if (
    donationLoading ||
    isRoleLoading ||
    charityLoading ||
    favoriteLoading ||
    requestsLoading
  )
    return <Loading />;
  if (donationError)
    return (
      <div className="text-center mt-10 text-error">
        Error loading donation details.
      </div>
    );

  return (
    <div className="min-h-screen pt-22 bg-base-100 max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
      {/* Main Card */}
      <div className="bg-base-100 rounded-2xl shadow-lg border border-neutral/70 overflow-hidden">
        <div className="md:flex">
          {/* Image Section with fixed aspect ratio */}
          <div className="md:w-1/2 relative h-80 md:h-auto">
            <img
              src={donation?.donationImage}
              alt={donation?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <button
              onClick={() => {
                if (!user) {
                  navigate("/login", { state: { from: `/donation-details/${id}` } }); // redirect guest
                } else if (role === "user" || role === "charity") {
                  isFavorite ? removeFavorite.mutate() : addFavorite.mutate(); // toggle favorite
                }
              }}
              className={`absolute top-6 right-6 p-3 rounded-full bg-base-100/90 shadow-md hover:scale-110 transition-transform ${
                role === "admin" || role === "restaurant"
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={role === "admin" || role === "restaurant"}
              title={
                role === "admin" || role === "restaurant"
                  ? "Only users and charity can favorite"
                  : ""
              }
            >
              {isFavorite ? (
                <FaHeart className="text-error text-xl" />
              ) : (
                <FaRegHeart className="text-error/70 text-xl" />
              )}
            </button>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-accent">
                {donation?.title}
              </h1>
              <span
                className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  donation.status === "verified" ||
                  donation.status === "picked up"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : donation.status === "requested"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                {donation.status === "verified"
                  ? "Available"
                  : donation.status.charAt(0).toUpperCase() +
                    donation.status.slice(1)}
              </span>
            </div>

            <div className="border-b border-neutral/20 pb-6 mb-6">
              <p className="text-accent/80">
                {donation?.description || "No additional description provided"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <DetailItem
                icon={<FaUtensils className="text-primary" />}
                label="Food Type"
                value={donation?.foodType || "N/A"}
              />
              <DetailItem
                icon={<FaWeightHanging className="text-primary" />}
                label="Quantity"
                value={`${donation?.quantity ?? "-"} ${
                  donation?.quantityUnit || ""
                }`}
              />
              <DetailItem
                icon={<FaStore className="text-primary" />}
                label="Restaurant"
                value={donation?.restaurantName || "N/A"}
              />
              <DetailItem
                icon={<FaMapMarkerAlt className="text-primary" />}
                label="Location"
                value={donation?.location || "N/A"}
              />
              <DetailItem
                icon={<FaCalendarAlt className="text-primary" />}
                label="Pickup Window"
                value={`${donation?.pickupStart ?? "N/A"} - ${
                  donation?.pickupEnd || "N/A"
                }`}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login", {
                      state: { from: `/donation-details/${id}` },
                    });
                  } else if (role === "charity") {
                    setRequestModalOpen(true);
                  }
                }}
                className={`px-6 py-2 rounded-lg font-semibold duration-300 active:scale-95 transition-all ${
                  role === "admin" || role === "restaurant"
                    ? "bg-neutral/20 text-accent/50 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-accent cursor-pointer"
                }`}
                disabled={role === "admin" || role === "restaurant"}
              >
                {!user ? "Login to Request Donation" : "Request Donation"}
              </button>
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login", { state: { from: `/donation-details/${id}` } }); // redirect guest users with return URL
                  } else if (role === "charity" || role === "user") {
                    setReviewModalOpen(true); // open modal for logged-in charity or user
                  }
                }}
                className={`px-6 py-2 rounded-lg font-semibold duration-300 active:scale-95 transition-all ${
                  role === "admin" || role === "restaurant"
                    ? "bg-neutral/20 text-accent/50 cursor-not-allowed"
                    : "bg-secondary hover:bg-secondary/80 text-accent cursor-pointer"
                }`}
                disabled={role === "admin" || role === "restaurant"}
              >
                {!user ? "Login to Add Review" : "Add Review"}
              </button>

              {role === "charity" && acceptedRequest && (
                <button
                  className="px-6 py-2 bg-green-600/80 hover:bg-green-600/90 text-white rounded-lg duration-300 active:scale-95 font-semibold cursor-pointer transition-all"
                  onClick={() => {
                    Swal.fire({
                      title: "Confirm Pickup?",
                      text: "Are you sure the donation has been picked up?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Yes, confirm",
                    }).then((res) => {
                      if (res.isConfirmed) markAsPickedUp.mutate();
                    });
                  }}
                >
                  Confirm Pickup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
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
  );
};

// DetailItem component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-accent/60">{label}</p>
      <p className="text-accent/85 font-medium">{value}</p>
    </div>
  </div>
);

export default DonationDetails;
