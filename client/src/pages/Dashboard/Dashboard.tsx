import { BarChart3, TrendingUp, Users, PawPrint, Calendar, DollarSign } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Patients", value: "156", icon: PawPrint, color: "blue" },
    { label: "Appointments Today", value: "12", icon: Calendar, color: "green" },
    { label: "Staff Members", value: "24", icon: Users, color: "purple" },
    { label: "Today's Revenue", value: "$3,240", icon: DollarSign, color: "orange" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to PawCare Veterinary Clinic</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClass = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            orange: "bg-orange-100 text-orange-600",
          }[stat.color as string];

          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="flex items-end justify-around h-64 gap-2">
            {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${height}%` }} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Last 7 days</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <span className="font-semibold text-gray-900">58</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Scheduled</span>
              </div>
              <span className="font-semibold text-gray-900">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="font-semibold text-gray-900">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Appointment completed", details: "Bella - Golden Retriever checkup", time: "2 hours ago" },
            { action: "New patient registered", details: "Max - German Shepherd", time: "4 hours ago" },
            { action: "Invoice generated", details: "$450.00 - Surgical procedure", time: "6 hours ago" },
            { action: "Medical record updated", details: "Luna - Vaccination record", time: "1 day ago" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{item.action}</p>
                <p className="text-sm text-gray-600">{item.details}</p>
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
