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

const AdminRentalChart = ({ rentalData }: any) => {
  const totalRentals = rentalData.length;

  const aggregateData = (key: any) => {
    const result = rentalData.reduce((acc: any, item: any) => {
      acc[item[key]] = (acc[item[key]] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(result).map((key) => ({
      name: key,
      count: result[key],
    }));
  };

  const holdingsData = useMemo(() => aggregateData("holding"), [rentalData]);
  const divisionData = useMemo(() => aggregateData("division"), [rentalData]);
  const districtData = useMemo(() => aggregateData("district"), [rentalData]);
  const categoryData = useMemo(() => aggregateData("category"), [rentalData]);
  const postalCodeData = useMemo(
    () => aggregateData("postalCode"),
    [rentalData]
  );

  const topDistrictsData = useMemo(
    () => [...districtData].sort((a, b) => b.count - a.count).slice(0, 10),
    [districtData]
  );

  const topDivisionsData = useMemo(
    () => [...divisionData].sort((a, b) => b.count - a.count).slice(0, 5),
    [divisionData]
  );

  const landlordData = useMemo(() => {
    const result = rentalData.reduce((acc: any, item: any) => {
      if (item.landlordId?._id && item.landlordId?.name) {
        const landlordKey = `${item.landlordId._id}-${item.landlordId.name}`;
        acc[landlordKey] = (acc[landlordKey] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.keys(result).map((key) => {
      const [id, name] = key.split("-");
      return { name, count: result[key] };
    });
  }, [rentalData]);

  const availableData = [
    {
      name: "Available",
      count: rentalData.filter((item: any) => item.isAvailable).length,
    },
    {
      name: "Not Available",
      count: rentalData.filter((item: any) => !item.isAvailable).length,
    },
  ];

  return (
    <div className="my-10">
      <div className="p-4 bg-white/10 rounded-lg shadow text-center my-10">
        <h1 className="text-3xl font-bold text-violet-700 mb-5">
          Rental Statistic
        </h1>
        <p className="text-lg font-bold mb-2">Total Rentals: {totalRentals}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Holdings", data: holdingsData },
          { title: "Divisions", data: divisionData },
          { title: "Districts", data: districtData },
          { title: "Postal Codes", data: postalCodeData },
          { title: "Landlords", data: landlordData },
        ].map(({ title, data }, index) => (
          <div key={index} className="p-4 bg-white/10 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{title} Wise Rentals</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}

        {/* Categories Wise Rentals Pie Chart */}
        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Categories Wise Rentals</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
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

        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Availability Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={availableData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {availableData.map((entry, index) => (
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

        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">
            Top 10 Districts with Most Rentals
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topDistrictsData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white/10 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">
            Top 5 Divisions with Most Rentals
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topDivisionsData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminRentalChart;
