import { 
  FaHandsHelping, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaDonate, 
  FaClock 
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CharityProfile = () => {
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

  const charityData = Userdata?.[0] || {};

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-base-100">Charity Profile</h1>
      </div>
      
      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-xl shadow-md p-6 lg:col-span-1">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-base-100 shadow-md overflow-hidden">
                <img
                  src={charityData?.photoURL || "/default-charity.jpg"}
                  alt={charityData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-base-100 rounded-full p-1 shadow-sm">
                <FaHandsHelping className="text-xs" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center text-accent">
              {charityData?.name || "Your Organization"}
            </h2>
            <span className="text-sm text-accent/70 mt-1">
              {charityData?.role || "Verified Charity"}
            </span>
          </div>

          {/* Quick Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-base-200 rounded-lg text-primary">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Email</p>
                <p className="text-sm text-accent">{charityData?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-base-200 rounded-lg text-secondary">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Phone</p>
                <p className="text-sm text-accent">{charityData?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-base-200 rounded-lg text-primary">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent/70">Location</p>
                <p className="text-sm text-accent">
                  {charityData?.address || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Card */}
          <div className="bg-base-100 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">About Us</h3>
            <p className="text-accent/90">
              {charityData?.missionStatement || 
               "We are dedicated to serving our community by providing food assistance to those in need."}
            </p>
          </div>

          {/* Donation Info Card */}
          <div className="bg-base-100 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Donation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg text-primary">
                  <FaDonate className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">We Accept</p>
                  <p className="text-sm text-accent">
                    {charityData?.donationAcceptance || "Non-perishable foods"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg text-secondary">
                  <FaUsers className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Serving</p>
                  <p className="text-sm text-accent">
                    {charityData?.beneficiariesServed || "100+ people weekly"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Info Card */}
          <div className="bg-base-100 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-accent mb-4">Service Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg text-primary">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Hours</p>
                  <p className="text-sm text-accent">
                    {charityData?.operatingHours || "Mon-Fri: 9AM-5PM"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-base-200 rounded-lg text-error">
                  <FaHandsHelping className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent/70">Focus Area</p>
                  <p className="text-sm text-accent">
                    {charityData?.targetPopulation || "Local community"}
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

export default CharityProfile;
