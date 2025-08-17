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

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Email</p>
                <p className="text-sm text-accent">{restaurantData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg text-green-500">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Phone</p>
                <p className="text-sm text-accent">{restaurantData?.phone || "Not provided"}</p>
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
            <h3 className="text-lg font-semibold text-accent mb-4">Restaurant Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Business Hours</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.businessHours || "9:00 AM - 10:00 PM"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg text-red-500">
                  <FaUtensils className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Cuisine Type</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.cuisineType || "Various"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FaMotorcycle className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Delivery</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.deliveryOptions || "Pickup only"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-500">
                  <FaCertificate className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Certifications</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.certifications?.foodSafety || "Food Safety Certified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Donation Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                  <FaRegClock className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Donation Frequency</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.donationFrequency || "Weekly"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Preferred Pickup</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.preferredPickupTimes || "After closing hours"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                  <FaUtensils className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Food Types</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.foodTypesAvailable?.join(", ") || "Prepared meals, Ingredients"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-500">
                  <FaStore className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Capacity</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.donationCapacity || "5-10 meals daily"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Member Since</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.created_at
                      ? new Date(restaurantData.created_at).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                  <FaHistory className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Last Login</p>
                  <p className="text-sm text-accent">
                    {restaurantData?.last_log_in
                      ? new Date(restaurantData.last_log_in).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;