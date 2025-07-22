import { FaStore, FaEnvelope, FaCalendarAlt, FaClock, FaPhone, FaMapMarkerAlt, FaUtensils, FaMotorcycle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";

const RestaurantProfile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: Userdata, isLoading } = useQuery({
    queryKey: ["single-user", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users?email=${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const restaurantData = Userdata?.[0] || {};

  return (
    <div>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg">
        Restaurant Profile
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Restaurant Logo and Name */}
          <div className="flex items-center mb-8">
            <div className="w-24 h-24 bg-base-200 rounded-full overflow-hidden shadow-md mr-6">
              <img
                src={restaurantData?.photoURL || "/default-restaurant.jpg"}
                alt={restaurantData?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-accent">
                {restaurantData?.name || "Coming Soon"}
              </h1>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                  <FaStore className="mr-1" />
                  {restaurantData?.role || "Restaurant"}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Contact Information
            </h3>
            
            <div className="flex items-start">
              <FaEnvelope className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{restaurantData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{restaurantData?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{restaurantData?.address || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Account Information
            </h3>
            
            <div className="flex items-start">
              <FaCalendarAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Member Since</p>
                <p className="text-accent">
                  {restaurantData?.created_at
                    ? new Date(restaurantData?.created_at).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaCalendarAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Last Login</p>
                <p className="text-accent">
                  {restaurantData?.last_log_in 
                    ? new Date(restaurantData.last_log_in).toLocaleString() 
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Restaurant Operations */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Restaurant Operations
            </h3>
            
            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Business Hours</p>
                <p className="text-accent">
                  {restaurantData?.businessHours || "9:00 AM - 10:00 PM"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUtensils className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Cuisine Type</p>
                <p className="text-accent">
                  {restaurantData?.cuisineType || "Various"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMotorcycle className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Delivery Options</p>
                <p className="text-accent">
                  {restaurantData?.deliveryOptions || "Pickup only"}
                </p>
              </div>
            </div>
          </div>

          {/* Food Donation Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Food Donation Details
            </h3>
            
            <div className="flex items-start">
              <FaUtensils className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Donation Frequency</p>
                <p className="text-accent">
                  {restaurantData?.donationFrequency || "Weekly"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Preferred Pickup Times</p>
                <p className="text-accent">
                  {restaurantData?.preferredPickupTimes || "After closing hours"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaStore className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Food Types Available</p>
                <p className="text-accent">
                  {restaurantData?.foodTypesAvailable?.join(", ") || "Prepared meals, Fresh ingredients"}
                </p>
              </div>
            </div>
          </div>

          {/* Certification Information */}
          {restaurantData?.certifications && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent border-b pb-2">
                Certifications
              </h3>
              
              <div className="flex items-start">
                <FaStore className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
                <div>
                  <p className="text-sm font-medium text-accent/80">Food Safety</p>
                  <p className="text-accent">
                    {restaurantData.certifications.foodSafety || "Certified"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;