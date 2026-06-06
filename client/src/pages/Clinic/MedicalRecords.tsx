import { useState } from "react";
import { Plus, Search, FileText, Download, Eye } from "lucide-react";

interface MedicalRecord {
  id: number;
  petName: string;
  date: string;
  type: string;
  veterinarian: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [records] = useState<MedicalRecord[]>([
    {
      id: 1,
      petName: "Bella",
      date: "2026-06-06",
      type: "Checkup",
      veterinarian: "Dr. Michael Chen",
      diagnosis: "Healthy",
      treatment: "Routine vaccination",
      notes: "All vitals normal. Pet is in excellent health.",
    },
    {
      id: 2,
      petName: "Luna",
      date: "2026-06-04",
      type: "Dental Cleaning",
      veterinarian: "Dr. Sarah Wilson",
      diagnosis: "Plaque buildup",
      treatment: "Professional dental cleaning",
      notes: "Removed tartar, prescribed dental treats.",
    },
    {
      id: 3,
      petName: "Max",
      date: "2026-05-15",
      type: "Injury",
      veterinarian: "Dr. Michael Chen",
      diagnosis: "Sprained leg",
      treatment: "Rest and anti-inflammatory",
      notes: "Follow-up in 2 weeks. No running for now.",
    },
  ]);

  const filtered = records.filter(
    (r) =>
      r.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-2">View and manage patient medical history</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add Record
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by pet name or record type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filtered.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{record.petName}</h3>
                <p className="text-gray-600 text-sm">{record.date}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {record.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Veterinarian</p>
                <p className="font-medium text-gray-900">{record.veterinarian}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Diagnosis</p>
                <p className="font-medium text-gray-900">{record.diagnosis}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Treatment</p>
                <p className="font-medium text-gray-900">{record.treatment}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Notes:</strong> {record.notes}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2">
                <Eye size={16} />
                View Details
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500 text-lg">No medical records found</p>
        </div>
      )}
    </div>
  );
}
