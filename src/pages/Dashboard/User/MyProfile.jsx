import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaHistory,
  FaHandsHelping,
  FaMapMarkerAlt,
  FaPhone,
  FaInfoCircle,
  FaDonate,
  FaUtensils,
  FaBuilding,
  FaClock
} from "react-icons/fa";
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

  if (isLoading) return <Loading />;

  const userData = Userdata?.[0] || {};

  return (
    <section>
      {/* Header Section */}
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Profile</h1>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-xl shadow-md p-6 lg:col-span-1 border border-neutral">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                <img
                  src={userData?.photoURL || "/default-user.jpg"}
                  alt={userData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-secondary text-white rounded-full p-1 shadow-sm">
                <FaUser className="text-xs" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center text-accent">
              {userData?.name || "User"}
            </h2>
            <span className="badge badge-primary mt-2 gap-1">
              {userData?.role || "USER"}
            </span>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Email</p>
                <p className="text-sm text-accent">{userData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg text-green-500">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Phone</p>
                <p className="text-sm text-accent">{userData?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Location</p>
                <p className="text-sm text-accent">{userData?.location || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="bg-base-100 rounded-xl shadow-md p-6 border border-neutral">
            <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
              <FaUser className="text-primary" /> Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Member Since</p>
                  <p className="text-sm text-accent">
                    {userData?.created_at
                      ? new Date(userData.created_at).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FaHistory className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Last Login</p>
                  <p className="text-sm text-accent">
                    {userData?.last_log_in
                      ? new Date(userData.last_log_in).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Humanitarian Profile */}
          <div className="bg-base-100 rounded-xl shadow-md p-6 border border-neutral">
            <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
              <FaHandsHelping className="text-primary" /> Humanitarian Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-500">
                  <FaHandsHelping className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Volunteer Status</p>
                  <p className="text-sm text-accent">
                    {userData?.volunteerStatus || "Not currently volunteering"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg text-red-500">
                  <FaDonate className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Donation History</p>
                  <p className="text-sm text-accent">
                    {userData?.donationCount
                      ? `${userData.donationCount} donations made`
                      : "No donations yet"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                  <FaInfoCircle className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Preferred Causes</p>
                  <p className="text-sm text-accent">
                    {userData?.preferredCauses?.join(", ") || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Preferences */}
          <div className="bg-base-100 rounded-xl shadow-md p-6 border border-neutral">
            <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
              <FaUtensils className="text-primary" /> Food Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                  <FaUtensils className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Donation Types</p>
                  <p className="text-sm text-accent">
                    {userData?.donationTypes?.join(", ") || "All types accepted"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Pickup Availability</p>
                  <p className="text-sm text-accent">
                    {userData?.pickupAvailability || "Flexible"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Info (if applicable) */}
          {userData?.organization && (
            <div className="bg-base-100 rounded-xl shadow-md p-6 border border-neutral">
              <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                <FaBuilding className="text-primary" /> Organization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-500">
                    <FaBuilding className="text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-accent/70">Name</p>
                    <p className="text-sm text-accent">{userData.organization.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                    <FaInfoCircle className="text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-accent/70">Type</p>
                    <p className="text-sm text-accent">{userData.organization.type}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;