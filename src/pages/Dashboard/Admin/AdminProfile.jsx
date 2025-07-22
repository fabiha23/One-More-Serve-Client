import { FaShieldAlt, FaEnvelope, FaCrown, FaUserCog, FaServer, FaHistory, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: adminData, isLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users?email=${user?.email}`);
      return data?.[0] || {};
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg">
        Admin Profile
      </h2>
      
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
              <div>
                <p className="text-accent">{adminData?.email || "Not provided"}</p>
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
                  {adminData?.created_at
                    ? new Date(adminData?.created_at).toLocaleDateString()
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
          {/* Admin Privileges */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Admin Privileges
            </h3>
            
            <div className="flex items-start">
              <FaShieldAlt className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">Access Level</p>
                <p className="text-accent font-bold">FULL SYSTEM CONTROL</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUserCog className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">User Management</p>
                <p className="text-accent">Create, edit, and delete user accounts</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaServer className="mt-1 mr-3 text-accent/80 min-w-[16px]" />
              <div>
                <p className="text-sm font-medium text-accent/80">System Configuration</p>
                <p className="text-accent">Modify all system settings</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent border-b pb-2">
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="btn btn-primary btn-sm">
                <FaUserCog className="mr-2" />
                Manage Users
              </button>
              <button className="btn btn-secondary btn-sm">
                <FaServer className="mr-2" />
                System Settings
              </button>
              <button className="btn bg-accent hover:bg-accent/90 text-base-100 btn-sm">
                <FaHistory className="mr-2" />
                View Logs
              </button>
              <button className="btn btn-outline btn-sm border-accent text-accent">
                <FaShieldAlt className="mr-2" />
                Security
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;