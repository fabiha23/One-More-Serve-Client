import {
  FaStore,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaUtensils,
  FaMotorcycle,
  FaCertificate,
  FaRegClock,
  FaHistory
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RestaurantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: Userdata, isLoading } = useQuery({
    queryKey: ["single-user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const restaurantData = Userdata?.[0] || {};

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white">Restaurant Profile</h1>
        <p className="text-white/80 mt-1">Manage your restaurant information</p>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden">
                <img
                  src={restaurantData?.photoURL || "/default-restaurant.jpg"}
                  alt={restaurantData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white rounded-full p-1 shadow-sm">
                <FaStore className="text-xs" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center text-accent">
              {restaurantData?.name || "Your Restaurant"}
            </h2>
            <span className="badge badge-warning mt-2 gap-1">
              <FaStore className="text-xs" />
              {restaurantData?.role || "RESTAURANT"}
            </span>
          </div>

          {/* Quick Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Email</p>
                <p className="text-sm text-accent">
                  {restaurantData?.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg text-green-500">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Phone</p>
                <p className="text-sm text-accent">
                  {restaurantData?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Address</p>
                <p className="text-sm text-accent">
                  {restaurantData?.address || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Operations Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">
              Restaurant Operations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<FaClock className="text-sm" />}
                color="bg-amber-50 text-amber-500"
                label="Business Hours"
                value={restaurantData?.businessHours || "9:00 AM - 10:00 PM"}
              />

              <InfoItem
                icon={<FaUtensils className="text-sm" />}
                color="bg-red-50 text-red-500"
                label="Cuisine Type"
                value={restaurantData?.cuisineType || "Various"}
              />

              <InfoItem
                icon={<FaMotorcycle className="text-sm" />}
                color="bg-blue-50 text-blue-500"
                label="Delivery"
                value={restaurantData?.deliveryOptions || "Pickup only"}
              />

              <InfoItem
                icon={<FaCertificate className="text-sm" />}
                color="bg-green-50 text-green-500"
                label="Certifications"
                value={
                  restaurantData?.certifications?.foodSafety ||
                  "Food Safety Certified"
                }
              />
            </div>
          </div>

          {/* Donation Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">
              Donation Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<FaRegClock className="text-sm" />}
                color="bg-purple-50 text-purple-500"
                label="Donation Frequency"
                value={restaurantData?.donationFrequency || "Weekly"}
              />

              <InfoItem
                icon={<FaClock className="text-sm" />}
                color="bg-indigo-50 text-indigo-500"
                label="Preferred Pickup"
                value={restaurantData?.preferredPickupTimes || "After closing hours"}
              />

              <InfoItem
                icon={<FaUtensils className="text-sm" />}
                color="bg-amber-50 text-amber-500"
                label="Food Types"
                value={
                  restaurantData?.foodTypesAvailable?.join(", ") ||
                  "Prepared meals, Ingredients"
                }
              />

              <InfoItem
                icon={<FaStore className="text-sm" />}
                color="bg-green-50 text-green-500"
                label="Capacity"
                value={restaurantData?.donationCapacity || "5-10 meals daily"}
              />
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<FaCalendarAlt className="text-sm" />}
                color="bg-blue-50 text-blue-500"
                label="Member Since"
                value={
                  restaurantData?.created_at
                    ? new Date(restaurantData.created_at).toLocaleDateString()
                    : "Not available"
                }
              />

              <InfoItem
                icon={<FaHistory className="text-sm" />}
                color="bg-purple-50 text-purple-500"
                label="Last Login"
                value={
                  restaurantData?.last_log_in
                    ? new Date(restaurantData.last_log_in).toLocaleString()
                    : "Not available"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, color, label, value }) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-accent/70">{label}</p>
      <p className="text-sm text-accent">{value}</p>
    </div>
  </div>
);

export default RestaurantProfile;
