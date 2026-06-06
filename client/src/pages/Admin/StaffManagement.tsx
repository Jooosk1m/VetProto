import { useState } from "react";
import { Plus, Search, Edit, Trash2, Mail, Phone, Badge } from "lucide-react";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive";
  specialty?: string;
}

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff] = useState<StaffMember[]>([
    {
      id: 1,
      name: "Dr. Michael Chen",
      role: "Veterinarian",
      email: "michael.chen@pawcare.com",
      phone: "+1 (555) 111-2222",
      joinDate: "2023-01-15",
      status: "active",
      specialty: "Surgery & Orthopedics",
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      role: "Veterinarian",
      email: "sarah.wilson@pawcare.com",
      phone: "+1 (555) 222-3333",
      joinDate: "2023-06-01",
      status: "active",
      specialty: "Dentistry & Dermatology",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Veterinary Technician",
      email: "emma.rodriguez@pawcare.com",
      phone: "+1 (555) 333-4444",
      joinDate: "2024-02-01",
      status: "active",
    },
    {
      id: 4,
      name: "James Thompson",
      role: "Clinic Manager",
      email: "james.thompson@pawcare.com",
      phone: "+1 (555) 444-5555",
      joinDate: "2023-03-10",
      status: "active",
    },
    {
      id: 5,
      name: "Lisa Martinez",
      role: "Receptionist",
      email: "lisa.martinez@pawcare.com",
      phone: "+1 (555) 555-6666",
      joinDate: "2024-05-15",
      status: "active",
    },
  ]);

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage clinic staff and employees</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add Staff Member
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Specialty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.specialty || "—"}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Mail size={14} />
                        {member.email}
                      </a>
                      <a href={`tel:${member.phone}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Phone size={14} />
                        {member.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      <Badge size={12} />
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No staff members found</p>
        </div>
      )}
    </div>
  );
}
