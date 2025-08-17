import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../../Components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle, FaTimesCircle, FaUtensils, FaStore, FaEnvelope, FaBox } from 'react-icons/fa';

const ManageDonations = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  // Fetch donations
  const { data: donations = [], refetch, isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations'); 
      return res.data.donations;
    },
  });

  // Handle verification
  const handleVerify = async (donationId) => {
    try {
      await axiosSecure.patch(`/donations/status/${donationId}`, { status: 'verified' });
      Swal.fire({
        title: 'Success',
        text: 'Donation verified successfully',
        icon: 'success',
        background: '#FEFAE0',
        confirmButtonColor: '#CCD5AE'
      });
      refetch();
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message || 'Failed to verify donation',
        icon: 'error',
        background: '#FEFAE0',
        confirmButtonColor: '#f43f5e'
      });
    }
  };

  // Handle rejection
  const handleReject = async (donationId) => {
    try {
      await axiosSecure.patch(`/donations/status/${donationId}`, { status: 'rejected' });
      Swal.fire({
        title: 'Success',
        text: 'Donation rejected successfully',
        icon: 'success',
        background: '#FEFAE0',
        confirmButtonColor: '#CCD5AE'
      });
      refetch();
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message || 'Failed to reject donation',
        icon: 'error',
        background: '#FEFAE0',
        confirmButtonColor: '#f43f5e'
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Manage Donations</h1>
        </div>
      </div>
      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {donations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaBox className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">No donations found</h3>
            <p className="text-accent/70">When restaurants submit donations, they'll appear here for verification.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaUtensils className="mr-2" /> Food Item
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaStore className="mr-2" /> Restaurant
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-2" /> Email
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {donations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.foodType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.restaurantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.restaurantEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {donation.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        donation.status === 'verified'
                          ? 'bg-primary/30 text-accent border border-primary'
                          : donation.status === 'rejected'
                          ? 'bg-error/10 text-error border border-error/20'
                          : 'bg-secondary/30 text-accent border border-secondary'
                      }`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {donation.status === 'pending' ? (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleVerify(donation._id)}
                            className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors flex items-center"
                          >
                            <FaCheckCircle className="mr-1" /> Verify
                          </button>
                          <button
                            onClick={() => handleReject(donation._id)}
                            className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center border border-error/20"
                          >
                            <FaTimesCircle className="mr-1" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-accent/50 italic">No actions</span>
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

export default ManageDonations; 