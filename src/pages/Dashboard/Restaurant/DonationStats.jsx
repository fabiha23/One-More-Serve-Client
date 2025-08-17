import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { FaChartBar, FaUtensils, FaDonate } from "react-icons/fa";
import Swal from "sweetalert2";

// Custom color palette
const COLORS = ['#CCD5AE', '#E9EDC9', '#FEFAE0', '#FAEDCD', '#D4A373', '#A3B18A'];

const DonationStats = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: donations = [], isLoading, error } = useQuery({
    queryKey: ["restaurant-donations", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `/donations?restaurantEmail=${user?.email}`
        );
        return data.donations || [];
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load donation data',
          icon: 'error',
          background: '#FEFAE0',
          confirmButtonColor: '#f43f5e'
        });
        return [];
      }
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="text-error">Error loading data</div>;

  // Process data for chart
  const chartData = Object.values(
    donations.reduce((acc, donation) => {
      const type = donation.foodType || 'Unknown';
      if (!acc[type]) {
        acc[type] = { foodType: type, count: 1, totalQuantity: donation.quantity || 0 };
      } else {
        acc[type].count += 1;
        acc[type].totalQuantity += donation.quantity || 0;
      }
      return acc;
    }, {})
  ).sort((a, b) => b.count - a.count); // Sort by count descending

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Donation Statistics</h1>
          <p className="text-base-100/90 mt-1">
            Visual overview of your food donations
          </p>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm p-6 border border-neutral">
        {donations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaDonate className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">No donation data</h3>
            <p className="text-accent/70">
              When you make donations, statistics will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-accent mb-4 flex items-center">
                <FaChartBar className="mr-2" /> Donations by Food Type
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="foodType" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                      tick={{ fill: '#4B5563' }}
                    />
                    <YAxis 
                      tick={{ fill: '#4B5563' }}
                      label={{
                        value: 'Number of Donations',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#4B5563'
                      }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: '#FEFAE0',
                        borderColor: '#CCD5AE',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      name="Number of Donations"
                      radius={[4, 4, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-accent mb-4 flex items-center">
                <FaUtensils className="mr-2" /> Food Quantity by Type
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="foodType" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                      tick={{ fill: '#4B5563' }}
                    />
                    <YAxis 
                      tick={{ fill: '#4B5563' }}
                      label={{
                        value: 'Total Quantity',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#4B5563'
                      }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: '#FEFAE0',
                        borderColor: '#CCD5AE',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar 
                      dataKey="totalQuantity" 
                      name="Total Quantity"
                      radius={[4, 4, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[(index + 2) % COLORS.length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationStats;