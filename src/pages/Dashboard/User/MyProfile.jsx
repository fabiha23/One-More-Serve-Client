import { FaUser, FaEnvelope, FaCalendarAlt, FaHistory, FaHeart, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";

const MyProfile = () => {
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

  // Extract the user object from the array
  const userData = Userdata?.[0] || {};

  return (
    <>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg px-6">
        My Profile
      </h2>
      <div className="p-6 bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="aspect-square w-40 h-40 bg-base-200 rounded-xl overflow-hidden shadow-md">
            <img
              src={userData?.photoURL || "/default-user.jpg"}
              alt={userData?.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-accent">
                  {userData?.name || "Coming Soon"}
                </h1>
                {/* <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    <FaUser className="mr-1" />
                    {userData?.role || "User"}
                  </span>
                </div> */}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaEnvelope className="mr-2" />
                  <h3 className="text-sm font-medium">Email</h3>
                </div>
                <p className="text-accent">{userData?.email || "Not provided"}</p>
              </div>

              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaPhone className="mr-2" />
                  <h3 className="text-sm font-medium">Phone</h3>
                </div>
                <p className="text-accent">
                  {userData?.phone || "Not provided"}
                </p>
              </div>

              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaCalendarAlt className="mr-2" />
                  <h3 className="text-sm font-medium">Member Since</h3>
                </div>
                <p className="text-accent">
                  {userData?.created_at
                    ? new Date(userData?.created_at).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaMapMarkerAlt className="mr-2" />
                  <h3 className="text-sm font-medium">Location</h3>
                </div>
                <p className="text-accent">
                  {userData?.location || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-accent mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1 flex items-center">
                <FaHeart className="mr-2" /> Favorite Cuisines
              </h3>
              <p className="text-accent">
                {userData?.favoriteCuisines?.join(", ") || "Not specified"}
              </p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1 flex items-center">
                <FaHistory className="mr-2" /> Account Activity
              </h3>
              <p className="text-accent">
                Last login: {userData?.last_log_in 
                  ? new Date(userData.last_log_in).toLocaleString() 
                  : "Not available"}
              </p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1">
                Dietary Preferences
              </h3>
              <p className="text-accent">
                {userData?.dietaryPreferences || "Not specified"}
              </p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1">
                Notification Preferences
              </h3>
              <p className="text-accent">
                {userData?.notificationPref || "Email notifications"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;