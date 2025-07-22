import { useQuery } from "@tanstack/react-query";
import { FaUtensils, FaMapMarkerAlt, FaCalendarAlt, FaWeight } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading";

const FeaturedDonations = () => {
  const axiosInstance = useAxios();

  const { data: allDonations, isLoading } = useQuery({
    queryKey: ["featured-donations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/donations");
      return data;
    },
  });

  if (isLoading) return <Loading />;
    const donations = allDonations?.slice(0, 4) || [];


  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Donations</h2>
      
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {donations?.map((donation) => (
    <div key={donation._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Reduced image height */}
      <figure className="h-36 overflow-hidden">
        <img 
          src={donation.donationImage} 
          alt={donation.title} 
          className="w-full h-full object-cover"
        />
      </figure>
      
      {/* Compact card body */}
      <div className="card-body p-3 flex-grow">
        <h3 className="card-title text-md line-clamp-1 mb-1">{donation.title}</h3>
        
        {/* Tighter info layout */}
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1">
            <FaUtensils className="text-accent text-xs" />
            <span className="line-clamp-1">{donation.foodType}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <FaWeight className="text-accent text-xs" />
            <span>{donation.quantity}{donation.quantityUnit}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-accent text-xs" />
            <span className="line-clamp-1">{donation.location}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-accent text-xs" />
            <span className="text-xs">
              {new Date(donation.pickupStart).toLocaleDateString()} - 
              {new Date(donation.pickupEnd).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Combined status and restaurant info */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="badge badge-sm capitalize">
              {donation.status}
            </div>
            <Link 
              to={`/donations/${donation._id}`} 
              className="btn btn-xs btn-primary"
            >
              Details
            </Link>
          </div>
          
          <p className="text-xs mt-1 text-gray-600">By: {donation.restaurantName}</p>
        </div>
      </div>
    </div>
  ))}
</div>
    </section>
  );
};

export default FeaturedDonations;