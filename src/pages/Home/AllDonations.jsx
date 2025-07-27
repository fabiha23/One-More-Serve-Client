import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAxios from '../../hooks/useAxios';
import DonationCard from './DonationCard';

const AllDonations = () => {
  const axiosInstance = useAxios();

  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const { data: donations = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['allDonations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations?status=Verified&status=Requested&status=Picked%20Up');
      return res.data;
    },
  });

  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    setIsSearching(true);
    try {
      const res = await axiosInstance.get(`/donations/search?status=Verified&status=Requested&status=Picked%20Up&city=${searchCity}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setSearchCity('');
    setSearchResults(null);
  };

  const renderDonations = searchResults ?? donations;

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-error py-10">Failed to load donations.</p>;

  return (
    <div className="min-h-screen py-8 bg-base-100 max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
      <h2 className="text-3xl font-bold text-center my-6 mt-10 text-accent">All Donations</h2>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="input input-bordered w-full sm:w-80"
        />
        <button onClick={handleSearch} className="btn btn-secondary">
          {isSearching ? 'Searching...' : 'Search'}
        </button>
        {searchResults && (
          <button onClick={handleReset} className="btn btn-ghost text-sm">
            Reset
          </button>
        )}
      </div>

      {/* Donations */}
      {renderDonations.length === 0 ? (
        <p className="text-center text-neutral-content">No donations found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
