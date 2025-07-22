import { FaShieldAlt, FaEnvelope, FaCrown, FaUserCog, FaServer, FaHistory } from "react-icons/fa";
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
    <div className="max-w-3xl mx-auto p-6 font-dm-sans">
      {/* Admin Card */}
      <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden border border-neutral">
        {/* Header with Dark Plum Gradient */}
        <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-base-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{adminData?.name || "System Admin"}</h1>
              <div className="flex items-center mt-2">
                <FaCrown className="mr-2 text-secondary" />
                <span className="font-medium bg-base-100/20 px-3 py-1 rounded-full text-secondary">
                  {adminData?.role?.toUpperCase() || "SUPER ADMIN"}
                </span>
              </div>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-base-100/30 overflow-hidden shadow-xl">
              <img
                src={adminData?.photoURL || "/default-admin.png"}
                alt={adminData?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100">
          {/* Power Badges */}
          <div className="bg-base-200 p-5 rounded-lg">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-secondary mr-3 text-xl" />
              <h3 className="text-lg font-semibold text-accent">Administrative Privileges</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="badge badge-lg badge-secondary gap-2">
                <FaUserCog /> Users
              </div>
              <div className="badge badge-lg badge-secondary gap-2">
                <FaServer /> System
              </div>
              <div className="badge badge-lg badge-secondary gap-2">
                <FaHistory /> Logs
              </div>
              <div className="badge badge-lg badge-secondary gap-2">
                <FaShieldAlt /> Security
              </div>
            </div>
          </div>

          {/* Essential Info */}
          <div className="space-y-5">
            <div className="flex items-start border-b border-neutral pb-4">
              <FaEnvelope className="mt-1 mr-3 text-secondary" />
              <div>
                <p className="text-sm font-medium text-accent/80">Admin Email</p>
                <p className="text-accent font-mono">{adminData?.email}</p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <div className="flex items-center">
                <FaShieldAlt className="text-primary mr-3" />
                <div>
                  <p className="text-sm font-medium text-accent/80">Access Level</p>
                  <p className="text-primary font-bold">FULL CONTROL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-base-200 px-6 py-4 border-t border-neutral">
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary">
              <FaUserCog className="mr-2" />
              User Management
            </button>
            <button className="btn btn-secondary">
              <FaServer className="mr-2" />
              System Config
            </button>
            <button className="btn bg-accent hover:bg-accent/90 text-base-100">
              <FaHistory className="mr-2" />
              Audit Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;