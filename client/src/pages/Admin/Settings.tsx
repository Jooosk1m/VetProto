import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

export default function Settings() {
  const [clinicSettings, setClinicSettings] = useState({
    clinicName: "PawCare Veterinary Clinic",
    phone: "+1 (555) 123-4567",
    email: "info@pawcare.com",
    address: "123 Main Street, City, State 12345",
    website: "www.pawcare.com",
    license: "VET-2023-12345",
  });

  const [businessHours, setBusinessHours] = useState({
    monday: "09:00 - 18:00",
    tuesday: "09:00 - 18:00",
    wednesday: "09:00 - 18:00",
    thursday: "09:00 - 18:00",
    friday: "09:00 - 18:00",
    saturday: "10:00 - 16:00",
    sunday: "Closed",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsAlerts: true,
    appointmentReminders: true,
    autoBackup: true,
  });

  const handleClinicChange = (field: string, value: string) => {
    setClinicSettings({ ...clinicSettings, [field]: value });
  };

  const handleHoursChange = (day: string, value: string) => {
    setBusinessHours({ ...businessHours, [day]: value });
  };

  const handleNotificationChange = (setting: string) => {
    setNotifications({ ...notifications, [setting]: !notifications[setting as keyof typeof notifications] });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your clinic settings and preferences</p>
      </div>

      {/* Clinic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Clinic Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
            <input
              type="text"
              value={clinicSettings.clinicName}
              onChange={(e) => handleClinicChange("clinicName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={clinicSettings.phone}
                onChange={(e) => handleClinicChange("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={clinicSettings.email}
                onChange={(e) => handleClinicChange("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={clinicSettings.address}
              onChange={(e) => handleClinicChange("address", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={clinicSettings.website}
                onChange={(e) => handleClinicChange("website", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Veterinary License</label>
              <input
                type="text"
                value={clinicSettings.license}
                onChange={(e) => handleClinicChange("license", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Hours</h2>
        <div className="space-y-4">
          {Object.entries(businessHours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-4">
              <label className="w-24 text-sm font-medium text-gray-700 capitalize">{day}</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => handleHoursChange(day, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications & Preferences */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications & Preferences</h2>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotificationChange(key)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex gap-4">
        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-semibold text-yellow-900 mb-1">Security Reminder</h3>
          <p className="text-sm text-yellow-800">Keep your clinic information secure. Change your password regularly and never share sensitive credentials.</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
          <Save size={20} />
          Save Changes
        </button>
        <button className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}
