import { useState } from "react";
import { BarChart3, LineChart, Download, Filter } from "lucide-react";

export default function ReportsAndAnalysis() {
  const [dateRange, setDateRange] = useState("month");

  const reports = [
    {
      id: 1,
      title: "Revenue Analysis",
      description: "Monthly revenue breakdown and trends",
      icon: BarChart3,
      data: [
        { month: "Jan", value: 15000 },
        { month: "Feb", value: 18000 },
        { month: "Mar", value: 16500 },
        { month: "Apr", value: 21000 },
        { month: "May", value: 19500 },
        { month: "Jun", value: 22500 },
      ],
    },
    {
      id: 2,
      title: "Appointment Analytics",
      description: "Appointment statistics and patient trends",
      icon: LineChart,
      data: [
        { month: "Week 1", value: 45 },
        { month: "Week 2", value: 52 },
        { month: "Week 3", value: 48 },
        { month: "Week 4", value: 61 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analysis</h1>
          <p className="text-gray-600 mt-2">View business analytics and performance metrics</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Download size={20} />
          Export Reports
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <Filter size={20} className="text-gray-600" />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-6">{report.description}</p>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-around h-48 gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
              {report.data.map((item, i) => {
                const maxValue = Math.max(...report.data.map((d) => d.value));
                const percentage = (item.value / maxValue) * 100;
                return (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t relative" style={{ height: `${percentage}%` }} />
                    <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                  </div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Total</p>
                <p className="text-xl font-bold text-blue-600">
                  ${report.data.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Average</p>
                <p className="text-xl font-bold text-green-600">
                  ${Math.round(report.data.reduce((sum, d) => sum + d.value, 0) / report.data.length).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Peak</p>
                <p className="text-xl font-bold text-purple-600">
                  ${Math.max(...report.data.map((d) => d.value)).toLocaleString()}
                </p>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium">
              View Detailed Report
            </button>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Patient Retention", value: "87%", trend: "↑ 5%" },
            { label: "Avg Appointment Value", value: "$285", trend: "↑ 12%" },
            { label: "Staff Utilization", value: "92%", trend: "↑ 3%" },
            { label: "Customer Satisfaction", value: "4.8/5", trend: "↑ 0.2" },
          ].map((metric, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-green-600 mt-2">{metric.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
