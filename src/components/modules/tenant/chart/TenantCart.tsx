"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { RentalFormData } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TenantChart = ({ requests }: { requests: RentalFormData[] }) => {
  const [showPending, setShowPending] = useState(false);
  const [showPaid, setShowPaid] = useState(false);

  const totalPending =
    requests?.filter((req) => req.status === "pending") || [];
  const totalApproved =
    requests?.filter((req) => req.status === "approved") || [];
  const totalPaid =
    requests?.filter((req) => req.paymentStatus === "paid") || [];
  const currentPaid = totalPaid.find((req) => req.transaction) || null;

  const chartData = {
    labels: ["Pending", "Approved", "Paid"],
    datasets: [
      {
        label: "Rental Requests",
        data: [totalPending.length, totalApproved.length, totalPaid.length],
        backgroundColor: ["#f59e0b", "#10b981", "#3b82f6"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Rental Summary</h2>

      {/* Chart */}
      <div className="mb-6">
        <Bar data={chartData} />
      </div>

      {/* Summary Counts */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowPending(!showPending)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Total Pending: {totalPending.length}
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Total Approved: {totalApproved.length}
        </button>
        <button
          onClick={() => setShowPaid(!showPaid)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Total Paid: {totalPaid.length}
        </button>
      </div>

      {/* Pending List */}
      {showPending && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-4 border rounded bg-gray-100 dark:bg-[#4f63b9] "
        >
          <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
          {totalPending.map((req: any) => (
            <div key={req._id} className="p-3 border-b">
              <p>
                <strong>Address:</strong> {req.listingId?.address},{" "}
                {req.listingId?.district}
              </p>
              <p>
                <strong>Rent Amount:</strong> {req.listingId?.rentAmount}
              </p>
              <p>
                <strong>Rent Duration:</strong> {req.rentalDuration}
              </p>
              <p>
                <strong>Landlord:</strong> {req.listingId?.landlordId?.name} (
                {req.listingId?.landlordId?.phoneNumber})
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Paid List */}
      {showPaid && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-4 border rounded bg-gray-100"
        >
          <h3 className="text-lg font-semibold mb-2">Paid Requests</h3>
          {totalPaid.map((req: any) => (
            <div key={req._id} className="p-3 border-b">
              <p>
                <strong>House:</strong> {req.listingId?.holding},{" "}
                {req.listingId?.unitNumber}
              </p>
              <p>
                <strong>Address:</strong> {req.listingId?.address},{" "}
                {req.listingId?.district}
              </p>
              <p>
                <strong>Rent Amount:</strong> {req.listingId?.rentAmount}
              </p>
              <p>
                <strong>Rental Duration:</strong> {req.rentalDuration}
              </p>
              <p>
                <strong>Total Rent Paid:</strong>{" "}
                {req.listingId?.rentAmount * req.rentalDuration}
              </p>
              <p>
                <strong>Rental Duration:</strong>{" "}
                {new Date(req.moveInDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Landlord:</strong> {req.listingId?.landlordId?.name} (
                {req.listingId?.landlordId?.phoneNumber})
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Current Paid Details with Animation */}
      {currentPaid && currentPaid.transaction && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 border rounded bg-blue-100 dark:bg-[#c99c52]"
        >
          <h3 className="text-lg font-semibold">Current Paid Details</h3>
          <p>
            <strong>Transaction ID:</strong> {currentPaid.transaction.id}
          </p>
          <p>
            <strong>Payment Method:</strong> {currentPaid.transaction.method}
          </p>
          <p>
            <strong>Transaction Date:</strong>{" "}
            {currentPaid.transaction.date_time}
          </p>
          <div className="border-b-4 border-amber-400 my-2"></div>
          <div>
            <h2 className="text-xl font-medium">Rental Info: </h2>
            <div>
              {totalPaid.map((req: any) => (
                <div key={req._id} className="">
                  <p>
                    <strong>House:</strong> {req.listingId?.holding},{" "}
                    {req.listingId?.unitNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {req.listingId?.address},{" "}
                    {req.listingId?.district}
                  </p>
                  <p>
                    <strong>Rent Amount:</strong> {req.listingId?.rentAmount}
                  </p>
                  <p>
                    <strong>Rental Duration:</strong> {req.rentalDuration}
                  </p>
                  <p>
                    <strong>Total Rent Paid:</strong>{" "}
                    {req.listingId?.rentAmount * req.rentalDuration}
                  </p>
                  <p>
                    <strong>Rental Duration:</strong>{" "}
                    {new Date(req.moveInDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Landlord:</strong> {req.listingId?.landlordId?.name}{" "}
                    ({req.listingId?.landlordId?.phoneNumber})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TenantChart;
