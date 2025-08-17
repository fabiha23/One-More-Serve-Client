import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import useAxios from '../../hooks/useAxios';
import DonationCard from './DonationCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllDonations = () => {
  const axiosInstance = useAxios();
  const axiosSecure=useAxiosSecure()

  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Sort order state: 'none', 'pickup-asc', 'pickup-desc'
  const [sortOrder, setSortOrder] = useState('none');

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ['allDonations'],
    queryFn: async () => {
      const res = await axiosInstance.get(
        '/donations?status=verified&status=requested&status=picked%20up'
      );
      return res.data;
    },
  });

  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    setIsSearching(true);
    try {
      const res = await axiosSecure.get(
        `/search-by-status?status=verified&status=requested&status=picked%20up&city=${searchCity}`
      );
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
    setSortOrder('none');
  };

  // Combine donations and search results
  const renderDonations = searchResults ?? donations;

  // Sorting based on pickupStart date
  const sortedDonations = [...renderDonations].sort((a, b) => {
    if (sortOrder === 'pickup-asc') {
      // Earliest to Latest pickupStart
      return new Date(a.pickupStart) - new Date(b.pickupStart);
    }
    if (sortOrder === 'pickup-desc') {
      // Latest to Earliest pickupStart
      return new Date(b.pickupStart) - new Date(a.pickupStart);
    }
    return 0; // no sorting
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-error py-10">Failed to load donations.</p>
    );

  return (
    <div className="min-h-screen py-8 bg-base-100 max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
      <h2 className="text-3xl font-bold text-center my-6 mt-10 text-accent">
        All Donations
      </h2>

      {/* Search & Sort Bar */}
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

        {/* Sort dropdown for pickupStart */}
        <select
          className="select select-bordered w-56"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by Pickup Time (Default)</option>
          <option value="pickup-asc">Pickup: Earliest to Latest</option>
          <option value="pickup-desc">Pickup: Latest to Earliest</option>
        </select>
      </div>

      {/* Donations */}
      {sortedDonations.length === 0 ? (
        <p className="text-center text-neutral-content">No donations found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
