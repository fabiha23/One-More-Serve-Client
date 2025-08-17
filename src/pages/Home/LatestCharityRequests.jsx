import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading";

const LatestCharityRequests = () => {
  const axiosInstance = useAxios();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["latestDonationRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donationRequests");
      return res.data.slice(0, 3); // latest 3 requests
    },
  });

  if (isLoading) return <Loading />;

 return (
  <section className="py-12">
    <div className=" text-center">
      <h2 className="text-3xl font-bold text-accent mb-8">
        Latest Charity Requests
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {requests.map((charity, idx) => (
          <div
            key={idx}
            className="bg-secondary border border-neutral/20 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md shadow-black/20 transition-all duration-200 pt-16 pb-6 px-6 relative mt-12"
          >
            {/* Profile Image - Half Outside Card */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24">
              <img
                src={charity.charityImage}
                alt={charity.charityName}
                className="w-full h-full object-cover rounded-full border-4 border-base-100 shadow-lg"
              />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-accent mb-2">
                {charity.charityName}
              </h3>
              <p className="text-accent/80 text-sm mb-4 font-semibold italic">
                "{charity.requestDescription}"
              </p>
              <p className="text-accent/80 text-sm">
                {charity.donationTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

export default LatestCharityRequests;
