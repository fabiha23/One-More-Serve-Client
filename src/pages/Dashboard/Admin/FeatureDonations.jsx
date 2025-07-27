import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FeatureDonations = () => {
  const axiosInstance = useAxios();
  const axiosSecure =useAxiosSecure()

  const { data: donations = [], refetch, isLoading } = useQuery({
    queryKey: ['verifiedDonations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations?status=Verified');
      return res.data;
    },
  });

  const handleFeature = async (donationId) => {
    try {
      await axiosSecure.patch(`/donations/feature/${donationId}`, { featured: true });
      Swal.fire('Success', 'Donation has been featured!', 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Feature Donations</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={donation.donationImage} alt="Donation" />
                    </div>
                  </div>
                </td>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>
                  {donation.featured ? (
                    <span className="badge badge-success">Featured</span>
                  ) : (
                    <button onClick={() => handleFeature(donation._id)} className="btn btn-xs btn-primary">
                      Feature
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
