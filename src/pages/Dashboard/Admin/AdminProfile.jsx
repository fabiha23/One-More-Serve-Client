import {
  FaShieldAlt,
  FaEnvelope,
  FaCrown,
  FaUserCog,
  FaServer,
  FaHistory,
  FaCalendarAlt,
  FaKey,
  FaLock,
  FaChartLine
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: adminData, isLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user?.email}`);
      return data?.[0] || {};
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Profile</h1>
      </div>
      
      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden">
                <img
                  src={adminData?.photoURL || "/default-admin.png"}
                  alt={adminData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 shadow-sm">
                <FaCrown className="text-xs" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center text-accent">
              {adminData?.name || "System Administrator"}
            </h2>
            <span className="badge badge-secondary mt-2 gap-1">
              <FaShieldAlt className="text-xs" />
              {adminData?.role || "ADMINISTRATOR"}
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
                <p className="text-sm text-accent">{adminData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                <FaKey className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Access Level</p>
                <p className="text-sm text-accent">
                  {adminData?.accessLevel || "Full Access"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg text-green-500">
                <FaCalendarAlt className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Member Since</p>
                <p className="text-sm text-accent">
                  {adminData?.created_at
                    ? new Date(adminData.created_at).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Permissions Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Admin Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg text-red-500">
                  <FaLock className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Security Level</p>
                  <p className="text-sm text-accent">
                    {adminData?.securityLevel || "Tier 3 (Highest)"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                  <FaUserCog className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">User Management</p>
                  <p className="text-sm text-accent">
                    {adminData?.canManageUsers ? "Full Access" : "Restricted"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                  <FaServer className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">System Modules</p>
                  <p className="text-sm text-accent">
                    {adminData?.managedModules?.join(", ") || "All modules"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-500">
                  <FaChartLine className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Analytics Access</p>
                  <p className="text-sm text-accent">
                    {adminData?.hasAnalyticsAccess ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Recent Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                  <FaHistory className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Last Login</p>
                  <p className="text-sm text-accent">
                    {adminData?.last_log_in
                      ? new Date(adminData.last_log_in).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Account Created</p>
                  <p className="text-sm text-accent">
                    {adminData?.created_at
                      ? new Date(adminData.created_at).toLocaleDateString()
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

export default AdminProfile;