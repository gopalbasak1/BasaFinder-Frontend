"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

type Rental = {
  _id: string;
  holding: string;
  unitNumber: string;
  isAvailable: boolean;
  rentAmount: number;
};

type RentalRequest = {
  _id: string;
  listingId: Rental; // Assuming it contains rental details
  tenantId: string;
  rentalDuration: number;
  paymentStatus: "pending" | "paid";
  transaction?: boolean;
};

interface LandlordChartProps {
  rentals: any;
  rentalsMeta?: any; // Ensure this is included
  rentalRequests: any;
}

const LandlordChart: React.FC<LandlordChartProps> = ({
  rentals,
  rentalRequests,
  rentalsMeta,
}) => {
  if (!rentals?.length || !rentalRequests?.length) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  console.log(rentalsMeta);
  //   console.log(rentalRequests?.map((t: any) => t.tenantId));
  //   console.log(rentalRequests?.map((r: any) => r.listingId));

  const [chartSize, setChartSize] = useState({
    outerRadius: 100,
    innerRadius: 60,
    fontSize: 12,
  });
  // Adjust chart size dynamically based on screen width
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        // Small screens (mobile)
        setChartSize({ outerRadius: 60, innerRadius: 40, fontSize: 10 });
      } else if (window.innerWidth < 1024) {
        // Medium screens (tablet)
        setChartSize({ outerRadius: 80, innerRadius: 50, fontSize: 12 });
      } else {
        // Large screens (desktop)
        setChartSize({ outerRadius: 100, innerRadius: 60, fontSize: 14 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { user } = useUser();

  // Calculate statistics
  const totalAvailable = rentals.filter(
    (r: any) => r.isAvailable === true
  ).length;
  const totalBooked = rentals.length - totalAvailable;

  const totalPayment = rentalRequests.reduce(
    (sum: any, r: any) =>
      sum + (r.listingId?.rentAmount || 0) * (r.rentalDuration || 0),
    0
  );

  const pendingPayment = rentalRequests
    .filter((r: any) => r.paymentStatus === "pending")
    .reduce(
      (sum: any, r: any) =>
        sum + (r.listingId?.rentAmount || 0) * (r.rentalDuration || 0),
      0
    );

  const paidPayment = rentalRequests
    .filter((r: any) => r.paymentStatus === "paid")
    .reduce(
      (sum: any, r: any) =>
        sum + (r.listingId?.rentAmount || 0) * (r.rentalDuration || 0),
      0
    );

  const paidTenants = rentalRequests.filter(
    (r: any) => r.paymentStatus === "paid"
  ).length;

  const transactions = rentalRequests.filter((t: any) => t.transaction).length;

  // Count requests per listing ID
  const listingRequestCount = rentalRequests.reduce((acc: any, r: any) => {
    const listingId = r.listingId?._id || "Unknown";
    acc[listingId] = (acc[listingId] || 0) + 1;
    return acc;
  }, {});

  const listingData = Object.keys(listingRequestCount).map((listingId) => {
    const listing = rentalRequests.find(
      (r: any) => r.listingId?._id === listingId
    )?.listingId;
    return {
      name: listing
        ? `${listing.holding} - Unit ${listing.unitNumber}`
        : "Unknown",
      value: listingRequestCount[listingId],
    };
  });

  // Ensure values are valid numbers
  const formatValue = (value: any) =>
    !isNaN(value) && value !== null ? value : 0;

  const data = [
    { name: "Total Rentals", value: formatValue(rentals.length) },
    { name: "Total Requests", value: formatValue(rentalRequests.length) },
    {
      name: "Total Rejection",
      value: formatValue(
        rentalRequests.filter((r: any) => r.status === "rejected").length
      ),
    },
    { name: "Paid Tenants", value: paidTenants },
    { name: "Transactions", value: transactions },

    {
      name: "Payment Pending",
      value: formatValue(
        rentalRequests.filter((r: any) => r.paymentStatus === "pending").length
      ),
    },
    {
      name: "Payment Paid",
      value: formatValue(
        rentalRequests.filter((r: any) => r.paymentStatus === "paid").length
      ),
    },
    { name: "Available Rentals", value: formatValue(totalAvailable) },
    { name: "Booked Rentals", value: formatValue(totalBooked) },
  ];

  // Color palette for charts
  const pieColors = [
    "#4F46E5",
    "#22C55E",
    "#FACC15",
    "#F97316",
    "#EF4444",
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#9333EA",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-6 bg-gray-100 dark:bg-[#14192c] rounded-xl shadow-lg"
    >
      <div className="text-xl font-semibold text-gray-800 dark:text-white my-10 text-center">
        Hi {user?.name ? user.name : "there"}, welcome to your dashboard! 🎉
        Here you can manage your rentals, track payments, and stay updated.
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Rental & Payment Statistics
      </h2>

      {/* Payment Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold">Total Payment</p>
          <p className="text-2xl font-bold">{totalPayment.toFixed(2)}৳</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold">Pending Payment</p>
          <p className="text-2xl font-bold">${pendingPayment.toFixed(2)}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold">Paid Payment</p>
          <p className="text-2xl font-bold">${paidPayment.toFixed(2)}</p>
        </div>
      </div>

      {/* Paid Tenants & Transactions */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-500 text-white p-6 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold">Paid Tenants</p>
          <p className="text-2xl font-bold">{paidTenants}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg text-center shadow-md">
          <p className="text-lg font-semibold">Total Transactions</p>
          <p className="text-2xl font-bold">{transactions}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-[#2c3456] p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-[#78a14c] mb-4 text-center">
          Rental & Request Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            key={data.length} // Forces re-render if data changes
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              angle={-30} // Rotate labels for better visibility
              textAnchor="end"
            />
            <YAxis
              domain={[0, Math.max(...data.map((item) => item.value), 10)]} // Ensure bars are visible
              tickCount={5} // Provide more steps in the Y-axis for clarity
            />
            <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            <Bar dataKey="value" barSize={40} radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`bar-cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <p className="text-center text-gray-500 mt-2">
          Hover over bars to view details
        </p>
      </div>

      {/* New Bar Chart for Listing Requests */}
      <div className="bg-white dark:bg-[#2c3456] p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-[#5ea5d4] mb-4 text-center">
          Requests Per Rental
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={listingData}
            margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              angle={-30}
              textAnchor="end"
            />
            <YAxis
              domain={[
                0,
                Math.max(...listingData.map((item) => item.value), 10),
              ]}
              tickCount={5}
            />
            <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            <Bar dataKey="value" barSize={40} radius={[10, 10, 0, 0]}>
              {listingData.map((entry, index) => (
                <Cell
                  key={`bar-cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-[#2c3456] p-6 rounded-lg shadow-md mt-6 w-full h-auto">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-[#b063d1] mb-4 text-center">
          Payment & Rental Overview
        </h3>
        <div className="w-full flex justify-center items-center">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Tooltip formatter={(value, name) => [`${value}`, name]} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={chartSize.outerRadius}
                innerRadius={chartSize.innerRadius}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
                style={{ fontSize: chartSize.fontSize }} // Adjust font size dynamically
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default LandlordChart;
