import { FaStore, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
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

  // Extract the user object from the array
  const restaurantData = Userdata?.[0] || {};

  return (
    <>
      <h2 className="text-base-100 font-semibold text-2xl mb-2 bg-secondary p-4 rounded-xl">
        Restaurant Profile
      </h2>
      <div className=" p-6 bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="aspect-square w-40 h-40 bg-base-200 rounded-xl overflow-hidden shadow-md">
            <img
              src={restaurantData?.photoURL || "/default-restaurant.jpg"}
              alt={restaurantData?.name}
              className=" object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-accent">
                  {restaurantData?.name || "Coming Soon"}
                </h1>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                    <FaStore className="mr-1" />
                    {restaurantData?.role || "Coming Soon"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaEnvelope className="mr-2" />
                  <h3 className="text-sm font-medium">Email</h3>
                </div>
                <p className="text-accent">{restaurantData?.email || "Coming Soon"}</p>
              </div>

              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaCalendarAlt className="mr-2" />
                  <h3 className="text-sm font-medium">Member Since</h3>
                </div>
                <p className="text-accent">
                  {restaurantData?.created_at
                    ? new Date(restaurantData?.created_at).toLocaleDateString()
                    : "Coming Soon"}
                </p>
              </div>

              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex items-center text-accent/80 mb-1">
                  <FaCalendarAlt className="mr-2" />
                  <h3 className="text-sm font-medium">Last Login</h3>
                </div>
                <p className="text-accent">
                  {restaurantData?.last_log_in
                    ? new Date(restaurantData.last_log_in).toLocaleDateString()
                    : "Coming Soon"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-accent mb-4">
            Restaurant Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1">
                Contact Information
              </h3>
              <p className="text-accent">Coming Soon</p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1">
                Business Hours
              </h3>
              <p className="text-accent">Coming Soon</p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1">
                Cuisine Type
              </h3>
              <p className="text-accent">Coming Soon</p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-accent/80 mb-1">
                Delivery Options
              </h3>
              <p className="text-accent">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;