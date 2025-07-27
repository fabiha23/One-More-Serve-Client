import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

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
  const chartData = Object.values(
    donations.reduce((acc, donation) => {
      const type = donation.foodType;
      if (!acc[type]) {
        acc[type] = { foodType: type, count: 1 };
      } else {
        acc[type].count += 1;
      }
      return acc;
    }, {})
  );

  return (
    <div>
      <h2 className="text-accent text-2xl font-semibold">
        Donation Statistics
      </h2>
      <div className="flex justify-center mt-4">
        <BarChart
          width={600}
          height={350}
          data={chartData}
          margin={{ top: 30, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="foodType"
            label={{ value: "Food Type", position: "bottom" }}
          />
          <YAxis
            domain={[0, "dataMax + 1"]} // dataMax + 1 for spacing
            allowDecimals={false}
            label={{
              value: "Donation Count",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />
          <Bar dataKey="count" activeBar={<Rectangle stroke="#4338ca" />}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default DonationStats;

<XAxis dataKey="foodType" label={{ value: "Food Type", position: "bottom" }} />;
