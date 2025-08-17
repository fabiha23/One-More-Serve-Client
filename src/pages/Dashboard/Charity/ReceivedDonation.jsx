import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import { FaStore, FaUtensils, FaCalendarCheck, FaBoxOpen } from "react-icons/fa";

const RecievedDonation = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ["myPickedUpDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donationRequests?charityEmail=${user?.email}&status=picked up`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Requests</h1>
        </div>
      </div>


      {pickups.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-8 text-center border border-neutral">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <FaBoxOpen className="text-accent text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-accent mb-2">No donations received yet</h3>
          <p className="text-accent/70 max-w-md mx-auto">
            When you collect food donations from restaurants, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-accent mb-3">{item.donationTitle}</h3>
                
                <div className="space-y-3 text-sm text-accent/80 mb-5">
                  <div className="flex items-center">
                    <FaStore className="mr-2 text-accent/60" />
                    <span><span className="font-medium">Restaurant:</span> {item.restaurantName}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUtensils className="mr-2 text-accent/60" />
                    <span><span className="font-medium">Food Type:</span> {item.foodType}</span>
                  </div>
                  {item.quantity && (
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Quantity:</span> {item.quantity}
                    </div>
                  )}
                  <div className="flex items-center">
                    <FaCalendarCheck className="mr-2 text-accent/60" />
                    <span><span className="font-medium">Collected:</span> {new Date(item.pickupTime).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral">
                  <span className=" text-xs font-medium text-accent">
                    Successfully Collected
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecievedDonation;