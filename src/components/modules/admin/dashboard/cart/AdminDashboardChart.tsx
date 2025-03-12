"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import AdminRentalChart from "./rental/AdminRentalChart";
import AdminRequestDashboard from "./request/AdminRequestDashboard";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboardChart = ({ userData, rentalData, requestData }: any) => {
  // Ensure default values to avoid crashes
  const roleCounts = userData?.reduce(
    (acc: any, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    { landlord: 0, tenant: 0, admin: 0 }
  );

  const activeCounts = userData?.reduce(
    (acc: any, user: any) => {
      if (user.isActive) {
        acc[user.role] = (acc[user.role] || 0) + 1;
      }
      return acc;
    },
    { landlord: 0, tenant: 0, admin: 0 }
  );

  const inactiveCounts = {
    landlord: roleCounts.landlord - activeCounts.landlord,
    tenant: roleCounts.tenant - activeCounts.tenant,
    admin: roleCounts.admin - activeCounts.admin,
  };

  // Landlords with and without listings
  const landlordsWithListings = userData?.filter(
    (user: any) => user.role === "landlord" && user.isListings === false
  ).length;

  const landlordsWithoutListings = roleCounts.landlord - landlordsWithListings;

  // Total Counts
  const totalUsers = userData?.length || 0;
  const totalActiveUsers =
    activeCounts.landlord + activeCounts.tenant + activeCounts.admin;
  const totalInactiveUsers = totalUsers - totalActiveUsers;
  const totalLandlords = roleCounts.landlord;

  // Chart Data (User Roles)
  const userCountData = {
    labels: ["Landlords", "Tenants", "Admins"],
    datasets: [
      {
        label: "Total Users",
        data: [roleCounts.landlord, roleCounts.tenant, roleCounts.admin],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      },
    ],
  };

  // Chart Data (Active vs Inactive Users)
  const activeInactiveData = {
    labels: ["Landlords", "Tenants", "Admins"],
    datasets: [
      {
        label: "Active Users",
        data: [activeCounts.landlord, activeCounts.tenant, activeCounts.admin],
        backgroundColor: "#4CAF50",
      },
      {
        label: "Inactive Users",
        data: [
          inactiveCounts.landlord,
          inactiveCounts.tenant,
          inactiveCounts.admin,
        ],
        backgroundColor: "#F44336",
      },
    ],
  };

  // Chart Data (Landlords with Listings)
  const landlordListingData = {
    labels: ["With Listings", "Without Listings"],
    datasets: [
      {
        label: "Landlords",
        data: [landlordsWithListings, landlordsWithoutListings],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  // **Chart Options (Responsive)**
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false, // Ensures charts adjust properly
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12, // Adjusted for readability
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          font: {
            size: 12, // Responsive font size
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="p-4 bg-white/10 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4">User Statistics</h2>

        {/* 📊 Charts - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Role Distribution Chart */}
          <div className="p-4 bg-white/10 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-center mb-2">
              User Role Distribution
            </h3>
            <div className="h-[300px]">
              <Bar data={userCountData} options={options} />
            </div>
          </div>

          {/* Active vs Inactive Users Chart */}
          <div className="p-4 bg-white/10 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-center mb-2">
              Active vs Inactive Users
            </h3>
            <div className="h-[300px]">
              <Bar data={activeInactiveData} options={options} />
            </div>
          </div>
        </div>

        {/* 📊 Landlords with Listings Chart */}
        <div className="mt-6 flex justify-center">
          <div className="w-full md:w-1/2 p-4 bg-white/10 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-center mb-2">
              Landlords with Listings
            </h3>
            <div className="h-[300px]">
              <Bar data={landlordListingData} options={options} />
            </div>
          </div>
        </div>

        {/* 📌 Summary Info */}
        <div className="mt-6 text-center">
          <p className="font-semibold text-lg">Total Users: {totalUsers}</p>
          <p className="text-green-600 font-semibold">
            Active Users: {totalActiveUsers}
          </p>
          <p className="text-red-600 font-semibold">
            Inactive Users: {totalInactiveUsers}
          </p>
          <p className="font-semibold text-blue-500">
            Total Landlords: {totalLandlords}
          </p>
          <p className="text-green-500 font-semibold">
            Landlords with Listings: {landlordsWithListings}
          </p>
          <p className="text-red-500 font-semibold">
            Landlords without Listings: {landlordsWithoutListings}
          </p>
          <p className="font-semibold text-purple-600">
            Total Rentals: {rentalData?.length}
          </p>
          <p>Total Rental Requests: {requestData?.length}</p>
        </div>
      </div>
      {/* 📈 Rental Chart */}
      <div className="mt-6">
        <AdminRentalChart rentalData={rentalData} />
      </div>
      <div className="mt-6">
        <AdminRequestDashboard requestData={requestData} />
      </div>
    </div>
  );
};

export default AdminDashboardChart;
