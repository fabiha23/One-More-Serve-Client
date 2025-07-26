import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAxios from '../../hooks/useAxios';
import DonationCard from './DonationCard';

const AllDonations = () => {
    const axiosInstance= useAxios()
  const { data: donations = [], isLoading, isError } = useQuery({
  queryKey: ['allDonations'],
  queryFn: async () => {
    const res = await axiosInstance.get('/donations?status=Verified&status=Requested&status=Picked%20Up');
    return res.data;
  },
});


  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-center text-error py-10">Failed to load donations.</p>;

  return (
    <div className="min-h-screen py-8 bg-base-100 max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
      <h2 className="text-3xl font-bold text-center my-6 mt-10 text-accent">All Donations</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {donations.map(donation => (
          <DonationCard key={donation._id} donation={donation} />
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
