import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { FaStar, FaRegStar, FaUtensils } from "react-icons/fa";

const FeatureDonations = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  // Fetch verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['verifiedDonations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations?status=verified');
      return res.data.donations;
    },
  });

  // Feature mutation
  const featureMutation = useMutation({
    mutationFn: async (donationId) => {
      const res = await axiosSecure.patch(`/donations/feature/${donationId}`, { featured: true });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Featured!",
        text: "Donation has been featured successfully.",
        icon: "success",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE"
      });
      queryClient.invalidateQueries(['verifiedDonations']);
    },
  });

  const handleFeature = (donationId) => {
    Swal.fire({
      title: "Feature this donation?",
      text: "It will be shown prominently on the homepage",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#CCD5AE",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, feature it!",
      background: "#FEFAE0"
    }).then((result) => {
      if (result.isConfirmed) {
        featureMutation.mutate(donationId);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Feature Donations</h1>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {donations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaUtensils className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">No verified donations found</h3>
            <p className="text-accent/70">Verified donations will appear here for featuring.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Donation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Food Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {donations.map((donation, idx) => (
                  <tr key={donation._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={donation.donationImage} 
                            alt={donation.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-accent">{donation.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.foodType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.restaurantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {donation.featured ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/10 text-success">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning/10 text-warning">
                          Not Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      {!donation.featured && (
                        <button
                          onClick={() => handleFeature(donation._id)}
                          className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center border border-primary/20"
                          disabled={featureMutation.isLoading}
                        >
                          <FaStar className="mr-1" /> Feature
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureDonations;