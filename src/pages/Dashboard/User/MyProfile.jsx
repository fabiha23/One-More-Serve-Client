import { FaUser, FaEnvelope, FaCalendarAlt, FaHistory, FaHandsHelping, FaMapMarkerAlt, FaPhone, FaInfoCircle, FaDonate } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: Userdata, isLoading } = useQuery({
    queryKey: ["single-user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const userData = Userdata?.[0] || {};

  return (
    <div>
           <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Profile</h1>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Profile Picture and Name */}
          <div className="flex items-center mb-8">
            <div className="w-24 h-24 bg-base-200 rounded-full overflow-hidden shadow-md mr-6">
              <img
                src={userData?.photoURL || "/default-user.jpg"}
                alt={userData?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-accent">
                {userData?.name || "Coming Soon"}
              </h1>
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
                <p className="text-accent">{userData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{userData?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-accent">{userData?.location || "Not provided"}</p>
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
                  {userData?.created_at
                    ? new Date(userData?.created_at).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaHistory className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Last Login</p>
                <p className="text-accent">
                  {userData?.last_log_in 
                    ? new Date(userData.last_log_in).toLocaleString() 
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Humanitarian Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Humanitarian Profile
            </h3>
            
            <div className="flex items-start">
              <FaHandsHelping className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Volunteer Status</p>
                <p className="text-accent">
                  {userData?.volunteerStatus || "Not currently volunteering"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaDonate className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Donation History</p>
                <p className="text-accent">
                  {userData?.donationCount 
                    ? `${userData.donationCount} donations made` 
                    : "No donations yet"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaInfoCircle className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Preferred Causes</p>
                <p className="text-accent">
                  {userData?.preferredCauses?.join(", ") || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Food Donation Preferences */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Food Donation Preferences
            </h3>
            
            <div className="flex items-start">
              <FaInfoCircle className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Preferred Donation Types</p>
                <p className="text-accent">
                  {userData?.donationTypes?.join(", ") || "All types accepted"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaInfoCircle className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Availability for Pickup</p>
                <p className="text-accent">
                  {userData?.pickupAvailability || "Flexible"}
                </p>
              </div>
            </div>
          </div>

          {/* Organization Information (if applicable) */}
          {userData?.organization && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent border-b pb-2">
                Organization Details
              </h3>
              
              <div className="flex items-start">
                <FaInfoCircle className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
                <div>
                  <p className="text-sm font-medium text-accent/80">Organization Name</p>
                  <p className="text-accent">{userData.organization.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaInfoCircle className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
                <div>
                  <p className="text-sm font-medium text-accent/80">Organization Type</p>
                  <p className="text-accent">{userData.organization.type}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;