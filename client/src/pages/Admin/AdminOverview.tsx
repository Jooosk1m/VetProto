import { useState } from "react";
import {
  BarChart2,
  Users,
  Settings,
  Eye,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

type TabType = "overview" | "staff" | "reports" | "settings";

export default function AdminOverview() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "staff", label: "Staff Management", icon: Users },
    { id: "reports", label: "Reports & Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage your clinic operations and settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 bg-white rounded-t-lg">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                isActive
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <IconComponent size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-sm p-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stats Cards */}
              <StatCard
                icon={Users}
                label="Total Staff"
                value="24"
                change="+2 this month"
                color="blue"
              />
              <StatCard
                icon={TrendingUp}
                label="Revenue"
                value="$45,200"
                change="+12% from last month"
                color="green"
              />
              <StatCard
                icon={AlertCircle}
                label="Pending Actions"
                value="8"
                change="5 urgent"
                color="orange"
              />
              <StatCard
                icon={CheckCircle}
                label="System Status"
                value="Online"
                change="All systems operational"
                color="green"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <ActivityItem
                  action="New staff member added"
                  details="Dr. Sarah Johnson joined the team"
                  time="2 hours ago"
                />
                <ActivityItem
                  action="System backup completed"
                  details="Daily automated backup finished successfully"
                  time="4 hours ago"
                />
                <ActivityItem
                  action="Report generated"
                  details="Monthly financial report is ready for review"
                  time="6 hours ago"
                />
                <ActivityItem
                  action="Settings updated"
                  details="Clinic hours and contact info updated"
                  time="1 day ago"
                />
              </div>
            </div>
          </div>
        )}

        {/* STAFF MANAGEMENT TAB */}
        {activeTab === "staff" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Staff Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                + Add Staff Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <StaffRow
                    name="Dr. Michael Chen"
                    role="Veterinarian"
                    status="Active"
                    joined="Jan 15, 2024"
                  />
                  <StaffRow
                    name="Sarah Johnson"
                    role="Clinic Manager"
                    status="Active"
                    joined="Feb 1, 2024"
                  />
                  <StaffRow
                    name="Emma Williams"
                    role="Veterinary Assistant"
                    status="Active"
                    joined="Mar 10, 2024"
                  />
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORTS & ANALYTICS TAB */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Reports & Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportCard
                title="Monthly Revenue Report"
                description="Detailed breakdown of monthly income and expenses"
                date="Generated: Today"
              />
              <ReportCard
                title="Staff Performance Metrics"
                description="Individual and team performance analytics"
                date="Generated: 3 days ago"
              />
              <ReportCard
                title="Patient Visit Statistics"
                description="Trends and patterns in patient appointments"
                date="Generated: 1 week ago"
              />
              <ReportCard
                title="Inventory Status Report"
                description="Current stock levels and reorder recommendations"
                date="Generated: 2 days ago"
              />
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>

            <div className="space-y-6">
              <SettingSection
                title="Clinic Information"
                description="Basic details about your clinic"
              >
                <SettingInput label="Clinic Name" value="PawCare Veterinary Clinic" />
                <SettingInput label="Phone Number" value="+1 (555) 123-4567" />
                <SettingInput label="Email Address" value="info@pawcare.com" />
              </SettingSection>

              <SettingSection
                title="Business Hours"
                description="Set your clinic's operating hours"
              >
                <SettingInput label="Monday - Friday" value="9:00 AM - 6:00 PM" />
                <SettingInput label="Saturday" value="10:00 AM - 4:00 PM" />
                <SettingInput label="Sunday" value="Closed" />
              </SettingSection>

              <SettingSection
                title="System Preferences"
                description="Configure system-wide settings"
              >
                <div className="space-y-3">
                  <CheckboxInput label="Enable email notifications" defaultChecked={true} />
                  <CheckboxInput label="Enable SMS alerts" defaultChecked={false} />
                  <CheckboxInput label="Automatic daily backups" defaultChecked={true} />
                </div>
              </SettingSection>

              <div className="flex gap-3 pt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
                <button className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({
  icon: IconComponent,
  label,
  value,
  change,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  change: string;
  color: "blue" | "green" | "orange";
}) {
  const colorClass = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  }[color];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center mb-3`}>
        <IconComponent size={20} />
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-xs text-gray-500">{change}</p>
    </div>
  );
}

// Component: Activity Item
function ActivityItem({
  action,
  details,
  time,
}: {
  action: string;
  details: string;
  time: string;
}) {
  return (
    <div className="flex gap-4 p-3 bg-white rounded-lg border border-gray-100">
      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{action}</p>
        <p className="text-sm text-gray-600">{details}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

// Component: Staff Row
function StaffRow({
  name,
  role,
  status,
  joined,
}: {
  name: string;
  role: string;
  status: string;
  joined: string;
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{role}</td>
      <td className="px-6 py-4 text-sm">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
          <CheckCircle size={12} />
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{joined}</td>
      <td className="px-6 py-4 text-sm">
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
      </td>
    </tr>
  );
}

// Component: Report Card
function ReportCard({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">{date}</p>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View Report →
        </button>
      </div>
    </div>
  );
}

// Component: Setting Section
function SettingSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
}

// Component: Setting Input
function SettingInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
      />
    </div>
  );
}

// Component: Checkbox Input
function CheckboxInput({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
