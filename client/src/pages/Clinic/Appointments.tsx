import { useState } from "react";
import { Plus, Search, Calendar, Clock, User, Phone, X } from "lucide-react";

interface Appointment {
  id: number;
  petName: string;
  owner: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled";
  veterinarian: string;
  notes: string;
}

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "scheduled" | "completed" | "cancelled">("all");

  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      petName: "Bella",
      owner: "John Smith",
      date: "2026-06-10",
      time: "09:00 AM",
      type: "Checkup",
      status: "scheduled",
      veterinarian: "Dr. Michael Chen",
      notes: "Routine vaccination and health check",
    },
    {
      id: 2,
      petName: "Luna",
      owner: "Sarah Johnson",
      date: "2026-06-10",
      time: "10:30 AM",
      type: "Dental Cleaning",
      status: "scheduled",
      veterinarian: "Dr. Sarah Wilson",
      notes: "Full dental cleaning and extractions if needed",
    },
    {
      id: 3,
      petName: "Max",
      owner: "Mike Davis",
      date: "2026-06-06",
      time: "02:00 PM",
      type: "Checkup",
      status: "completed",
      veterinarian: "Dr. Michael Chen",
      notes: "Routine visit - all clear",
    },
    {
      id: 4,
      petName: "Buddy",
      owner: "Emma Williams",
      date: "2026-06-05",
      time: "11:00 AM",
      type: "Surgery Consultation",
      status: "cancelled",
      veterinarian: "Dr. Sarah Wilson",
      notes: "Rescheduled to later date",
    },
  ]);

  const filtered = appointments.filter((apt) => {
    const matchesSearch =
      apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    scheduled: { bg: "bg-blue-50", text: "text-blue-700", label: "Scheduled" },
    completed: { bg: "bg-green-50", text: "text-green-700", label: "Completed" },
    cancelled: { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">Schedule and manage pet appointments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          New Appointment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by pet or owner name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "scheduled", "completed", "cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filtered.map((apt) => (
          <div key={apt.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{apt.petName}</h3>
                <p className="text-gray-600 text-sm">Owner: {apt.owner}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-medium text-sm ${
                  statusConfig[apt.status].bg
                } ${statusConfig[apt.status].text}`}
              >
                {statusConfig[apt.status].label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{apt.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">{apt.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium text-gray-900">{apt.type}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Veterinarian:</strong> {apt.veterinarian}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Notes:</strong> {apt.notes}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      )}
    </div>
  );
}
