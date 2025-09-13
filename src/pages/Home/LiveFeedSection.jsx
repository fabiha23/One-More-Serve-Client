import React, { useState } from 'react';
import { FaBell, FaUtensils, FaMapMarkerAlt, FaClock, FaSpinner } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const LiveFeedSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const axiosInstance=useAxios()

  // Fetch real donation data
  const { data: donations = [], isLoading, error } = useQuery({
    queryKey: ['liveDonations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/donations', {
        params: {
          sort: '-createdAt',
          limit: 5,
          status: 'verified' // Only show available donations
        }
      });
      return res.data.donations;
    },
    refetchInterval: isPaused ? false : 10000, // Auto-refresh every 10s
    refetchOnWindowFocus: true
  });

  // Calculate relative time and distance
  const processDonationData = (donation) => {
  return {
    ...donation,
    timeAgo: formatDistanceToNow(new Date(donation.createdAt)), // Added missing parenthesis
    distance: (Math.random() * 5 + 0.5).toFixed(1) // Mock distance for demo
  };
};

  if (error) {
    return (
      <div className="bg-base-100 p-8 rounded-xl border border-error/20 my-12 text-center">
        <p className="text-error">Failed to load donation activity</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-accent/70 hover:text-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-8 rounded-xl border border-neutral/20 my-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-primary/20 p-3 rounded-full mr-4">
            {isLoading ? (
              <FaSpinner className="text-primary text-xl animate-spin" />
            ) : (
              <FaBell className="text-primary text-xl" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-accent">Live Donation Activity</h2>
        </div>
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="text-sm text-accent/70 hover:text-primary transition"
          disabled={isLoading}
        >
          {isPaused ? 'Resume Updates' : 'Pause Updates'}
        </button>
      </div>

      {/* Feed Items */}
      <div className="space-y-4 mb-8">
        {isLoading ? (
          <div className="text-center py-8">
            <FaSpinner className="animate-spin text-2xl text-primary mx-auto mb-2" />
            <p className="text-accent/70">Loading donations...</p>
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-accent/70">No recent donations available</p>
          </div>
        ) : (
          donations.slice(0, 5).map((donation) => {
            const processed = processDonationData(donation);
            return (
              <div 
                key={donation._id} 
                className="p-4 rounded-lg border border-secondary/20 bg-base-100 hover:bg-base-200 transition"
              >
                <div className="flex items-start">
                  <div className="p-3 rounded-full mr-4 bg-secondary/20">
                    <FaUtensils className="text-secondary text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-accent">
                      {donation.restaurantName} donated {donation.quantity} {donation.foodType}
                    </p>
                    <div className="flex flex-wrap items-center mt-1 text-sm text-accent/70 gap-x-3">
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {processed.timeAgo} ago
                      </span>
                      <span className="flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {processed.distance} km away
                      </span>
                      {donation.pickupBefore && (
                        <span className="bg-warning/10 text-warning px-2 py-0.5 rounded text-xs">
                          Pickup before: {new Date(donation.pickupBefore).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs font-medium">
                    Available
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/all-donations"
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition flex items-center"
        >
          Browse All Donations
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LiveFeedSection;