import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DonationStats = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["restaurant-donations", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/donations?restaurantEmail=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, // Prevent fetching until user is loaded
  });
  if (isLoading) return <Loading></Loading>;
  // Group and sum quantities by foodType
  const chartData = donations.reduce((acc, donation) => {
    const type = donation.foodType || "Unknown";
    const existing = acc.find((item) => item.foodType === type);

    if (existing) {
existing.quantity += parseFloat(donation.quantity);
    } else {
      acc.push({ foodType: type, quantity: donation.quantity });
    }

    return acc;
  }, []);

  return (
    <div>
        <h2 className="text-accent text-2xl font-semibold">Donation Statistics</h2>
        <div className="flex justify-center mt-4">
      <BarChart
        width={600}
        height={350}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="foodType"
          label={{ value: "Food Type", position: "bottom" }}
        />
        <YAxis
          label={{ value: "Quantity", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
<Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="quantity"
          fill="#4f46e5"
          activeBar={<Rectangle fill="#c7d2fe" stroke="#4338ca" />}
        />
      </BarChart>
    </div>
    </div>
  );
};

export default DonationStats;
