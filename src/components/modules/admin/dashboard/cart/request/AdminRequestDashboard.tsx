import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6666",
];

const AdminRequestDashboard = ({ requestData }: any) => {
  if (!requestData || requestData.length === 0) {
    return <div>No requests available</div>;
  }

  // 1️⃣ Total number of rental requests
  const totalRequests = requestData.length;

  // 2️⃣ Count requests by listing ID
  // 2️⃣ Count requests by listing ID (including holding number)
  const listingRequests = useMemo(() => {
    const result = requestData.reduce((acc: any, item: any) => {
      const listingId = item.listingId?._id;
      const holdingNumber = item.listingId?.holding || "Unknown Holding";

      if (listingId) {
        const key = `${holdingNumber}`;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.keys(result).map((key) => ({
      name: key, // Shows Holding Number + Listing ID
      count: result[key],
    }));
  }, [requestData]);

  // 3️⃣ Count requests by tenant ID
  const tenantRequests = useMemo(() => {
    const result = requestData.reduce((acc: any, item: any) => {
      const tenantId = item.tenantId?._id;
      const tenantName = item.tenantId?.name;
      if (tenantId && tenantName) {
        acc[tenantId] = acc[tenantId] || { name: tenantName, count: 0 };
        acc[tenantId].count += 1;
      }
      return acc;
    }, {});

    return Object.values(result).sort((a: any, b: any) => b.count - a.count); // Sort by most requests
  }, [requestData]);

  // 4️⃣ Calculate total, pending, and paid payments
  const paymentData = useMemo(() => {
    let totalPayment = 0;
    let pendingPayment = 0;
    let paidPayment = 0;
    let successPaymentsCount = 0;

    requestData.forEach((item: any) => {
      const rentAmount = item.listingId?.rentAmount || 0;
      const rentalDuration = item.rentalDuration || 0;
      const paymentAmount = rentAmount * rentalDuration;

      if (item.paymentStatus === "pending") {
        pendingPayment += paymentAmount;
      } else {
        paidPayment += paymentAmount;
      }

      totalPayment += paymentAmount;
      // ✅ Count total success transactions
      if (item.transaction?.bank_status === "Success") {
        successPaymentsCount++;
      }
    });

    return {
      totalPayment,
      pendingPayment,
      paidPayment,
      successPaymentsCount,
    };
  }, [requestData]);
  // 📊 Data for the payment status pie chart
  const paymentChartData = [
    { name: "Paid Payment", value: paymentData.paidPayment },
    { name: "Pending Payment", value: paymentData.pendingPayment },
  ];

  return (
    <div className="my-10">
      <div className="p-4 bg-white/10 rounded-lg shadow text-center my-10">
        <h2 className="text-xl font-bold mb-4">Admin Request Dashboard</h2>
        <ul className="space-y-2">
          <li>
            Total Requests: <strong>{totalRequests}</strong>
          </li>
          <li>
            Total Listings with Requests:{" "}
            <strong>{listingRequests.length}</strong>
          </li>
          <li>
            Total Unique Tenants with Requests:{" "}
            <strong>{tenantRequests.length}</strong>
          </li>
          <li>
            Total Success Payments:{" "}
            <strong>{paymentData.successPaymentsCount}</strong>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Total Payment Box */}
        <div className="p-6 bg-white/10 rounded-lg shadow border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Payment</h2>
          <p className="text-2xl font-bold text-blue-600">
            {paymentData.totalPayment.toFixed(2)}৳
          </p>
        </div>

        {/* 🔸 Pending Payment Box */}
        <div className="p-6 bg-white/10 rounded-lg shadow border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Pending Payment
          </h2>
          <p className="text-2xl font-bold text-red-500">
            {paymentData.pendingPayment.toFixed(2)}৳
          </p>
        </div>

        {/* ✅ Paid Payment Box */}
        <div className="p-6 bg-white/10 rounded-lg shadow border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Paid Payment</h2>
          <p className="text-2xl font-bold text-green-500">
            {paymentData.paidPayment.toFixed(2)}৳
          </p>
        </div>

        {/* 🔹 Requests Per Listing */}
        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Requests Per Listing</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={listingRequests} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Requests Per Tenant */}
        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Requests Per Tenant</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenantRequests} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Payment Status Pie Chart */}
        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Payment Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {paymentChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminRequestDashboard;
