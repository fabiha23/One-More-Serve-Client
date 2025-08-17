import {
  FaShieldAlt,
  FaEnvelope,
  FaCrown,
  FaUserCog,
  FaServer,
  FaHistory,
  FaCalendarAlt,
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
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Admin Profile</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Profile Picture and Name */}
          <div className="flex items-center mb-8">
            <div className="w-24 h-24 bg-base-200 rounded-full overflow-hidden shadow-md mr-6">
              <img
                src={adminData?.photoURL || "/default-admin.png"}
                alt={adminData?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-accent">
                {adminData?.name || "System Admin"}
              </h1>
              <div className="badge badge-secondary mt-2 gap-1">
                <FaCrown className="text-sm" />
                {adminData?.role || "ADMINISTRATOR"}
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
              <p className="text-accent">
                {adminData?.email || "Not provided"}
              </p>
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
                <p className="text-sm font-medium text-accent/80">
                  Member Since
                </p>
                <p className="text-accent">
                  {adminData?.created_at
                    ? new Date(adminData.created_at).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaHistory className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Last Login</p>
                <p className="text-accent">
                  {adminData?.last_log_in
                    ? new Date(adminData.last_log_in).toLocaleString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 p-6 bg-base-100 rounded-lg shadow-lg">
          {/* Admin Permissions */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Admin Permissions
            </h3>
            <div className="flex items-start">
              <FaUserCog className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Role</p>
                <p className="text-accent">
                  {adminData?.role || "ADMINISTRATOR"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaShieldAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">
                  Access Level
                </p>
                <p className="text-accent">
                  {adminData?.accessLevel || "Full Access"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaServer className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">
                  Managed Modules
                </p>
                <p className="text-accent">
                  {adminData?.managedModules?.join(", ") || "All modules"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
