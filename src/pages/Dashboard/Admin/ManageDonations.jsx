import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios'; // your custom axios hook
import Loading from '../../../Components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageDonations = () => {
  const axiosInstance = useAxios();
  const axiosSecure=useAxiosSecure()

  // Fetch donations
  const { data: donations = [], refetch, isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations'); // your endpoint
      return res.data;
    },
  });

  // Handle verification (sets status to "Verified")
  const handleVerify = async (donationId) => {
    try {
      await axiosSecure.patch(`/donations/status/${donationId}`, { status: 'Verified' });
      Swal.fire('Success', 'Donation verified successfully', 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to verify donation', 'error');
    }
  };

  // Handle rejection (sets status to "Rejected")
  const handleReject = async (donationId) => {
    try {
      await axiosInstance.patch(`/donations/status/${donationId}`, { status: 'Rejected' });
      Swal.fire('Success', 'Donation rejected successfully', 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to reject donation', 'error');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Donation Title</th>
            <th>Food Type</th>
            <th>Restaurant Name</th>
            <th>Restaurant Email</th>
            <th>Quantity</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.title}</td>
              <td>{donation.foodType}</td>
              <td>{donation.restaurantName}</td>
              <td>{donation.restaurantEmail}</td>
              <td>{donation.quantity}</td>
              <td>
                <span
                  className={`badge ${
                    donation.status === 'Verified'
                      ? 'badge-success'
                      : donation.status === 'Rejected'
                      ? 'badge-error'
                      : 'badge-warning'
                  }`}
                >
                  {donation.status}
                </span>
              </td>
              <td className="text-center space-x-2">
                {donation.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleVerify(donation._id)}
                      className="btn btn-xs btn-success"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleReject(donation._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="italic text-gray-500">No actions</span>
                )}
              </td>
            </tr>
          ))}

          {donations.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No donations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDonations;
