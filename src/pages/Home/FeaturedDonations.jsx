import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { 
  FaUtensils, 
  FaStore, 
  FaMapMarkerAlt,
  FaWeightHanging,
  FaStar
} from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import Loading from '../../Components/Loading';

const FeaturedDonationsSection = () => {
  const axiosInstance = useAxios();

  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ['featuredDonations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations?featured=true&status=Verified');
      return res.data.slice(0, 4);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">
          Featured Donations
        </h2>

        {featuredDonations.length === 0 ? (
          <div className="text-center py-8 bg-base-100 rounded-lg shadow">
            <p className="text-accent">No featured donations available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDonations.map(donation => (
              <div 
                key={donation._id} 
                className="card bg-base-100 shadow-lg hover:shadow-xl transition duration-300 border border-base-200"
              >
                <figure className="h-40 relative overflow-hidden">
                  <img 
                    src={donation.donationImage} 
                    alt={donation.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 right-2 badge badge-primary gap-1 text-xs px-2 py-1">
                    <FaStar className="text-yellow-300" />
                    Featured
                  </div>
                </figure>

                <div className="card-body p-4">
                  <h3 className="card-title text-lg font-semibold mb-2">
                    {donation.title}
                  </h3>

                  <div className="space-y-1 text-accent text-sm">
                    <div className="flex items-center gap-2">
                      <FaUtensils className="text-accent" />
                      <span>{donation.foodType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStore className="text-accent" />
                      <span>{donation.restaurantName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-accent" />
                      <span>{donation.location || 'Location not provided'}</span>
                    </div>
                  </div>

                  <div className="card-actions mt-4 flex justify-between items-center">
                    <span className={`badge ${
                      donation.status === 'Verified' ? 'badge-success' : 'badge-neutral'
                    }`}>
                      {donation.status}
                    </span>
                    <Link 
                      to={`/donations/${donation._id}`} 
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDonationsSection;
