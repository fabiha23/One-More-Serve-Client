import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useAxios from "../../hooks/useAxios";
import DonationCard from "./DonationCard";
import { FaSearch, FaUndo, FaSort } from "react-icons/fa";

const AllDonations = () => {
  const axiosInstance = useAxios();

  const [searchCity, setSearchCity] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [page, setPage] = useState(1);
  const limit = 8; // donations per page

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allDonations", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/donations?status=verified&status=requested&status=picked%20up&page=${page}&limit=${limit}`
      );
      return res.data; // { donations, totalCount, currentPage, totalPages }
    },
    keepPreviousData: true,
  });

  const donations = data?.donations ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = async () => {
    if (!searchCity.trim()) return;

    setIsSearching(true);
    try {
      const res = await axiosInstance.get(
        `/search-by-status?status=verified&status=requested&status=picked%20up&city=${searchCity}`
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setSearchCity("");
    setSearchResults(null);
    setSortOrder("none");
  };

  const renderDonations = searchResults ?? donations;

  const sortedDonations = [...renderDonations].sort((a, b) => {
    if (sortOrder === "pickup-asc") {
      return new Date(a.pickupStart) - new Date(b.pickupStart);
    }
    if (sortOrder === "pickup-desc") {
      return new Date(b.pickupStart) - new Date(a.pickupStart);
    }
    return 0;
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-16">
        <p className="text-error text-lg font-medium bg-error/10 p-4 rounded-lg inline-block">
          Failed to load donations. Please try again.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen py-12 bg-base-100 max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
      {/* Header Section */}
      <div className="text-center my-4">
        <h2 className="text-4xl font-bold text-accent my-4 mt-10 relative inline-block">
          All Donations
        </h2>
        <p className="text-accent/70 max-w-2xl mx-auto">
          Browse available food donations from restaurants and businesses
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="bg-base-200 p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="input input-bordered focus:outline-0 w-full pl-10 bg-base-100 border-neutral/20 focus:border-primary/50"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent/50" />
            </div>

            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="min-w-[120px] px-4 py-2 rounded-lg bg-primary text-accent font-medium hover:bg-secondary transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isSearching ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Search
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {searchResults && (
              <button onClick={handleReset} className="btn btn-ghost text-sm">
                <FaUndo className="mr-2" />
                Reset
              </button>
            )}

            <div className="relative">
              <select
                className="select select-bordered w-48 sm:w-56 pl-9 bg-base-100 border-neutral/20 focus:border-primary/50 focus:outline-0 appearance-none"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">Sort by Pickup Time</option>
                <option value="pickup-asc">Earliest to Latest</option>
                <option value="pickup-desc">Latest to Earliest</option>
              </select>
              <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent/50 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      {sortedDonations.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-xl">
          <p className="text-accent/70 text-lg">
            {searchResults
              ? `No donations found in ${searchCity}`
              : "No donations available at this time"}
          </p>
          {searchResults && (
            <button
              onClick={handleReset}
              className="btn btn-ghost mt-4 text-primary"
            >
              Show all donations
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedDonations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>

          {/* Pagination */}
          {!searchResults && (
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    data?.currentPage === i + 1
                      ? "bg-primary text-white border-primary"
                      : "bg-base-100 hover:bg-base-200 border-neutral/20"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllDonations;
