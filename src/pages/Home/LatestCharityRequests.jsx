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
    <section className="py-12 px-4 bg-base-200">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-accent mb-8">
          Latest Charity Requests
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {requests.map((charity, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-neutral rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              <img
                src={charity.charityImage}
                alt={charity.charityName}
                className="h-24 w-24 mx-auto object-cover rounded-full mb-4 border border-neutral/30"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">
                {charity.charityName}
              </h3>
              <p className="text-accent text-sm mb-3">{charity.requestDescription}</p>
              <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-medium">
                {charity.donationTitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;
