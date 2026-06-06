import { useState } from "react";
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";

type PetType = "dog" | "cat" | "bird" | "other";

interface Patient {
  id: number;
  name: string;
  owner: string;
  petType: PetType;
  breed: string;
  age: number;
  phone: string;
  email: string;
  address: string;
}

export default function PatientsAndPets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Bella",
      owner: "John Smith",
      petType: "dog",
      breed: "Golden Retriever",
      age: 5,
      phone: "+1 (555) 123-4567",
      email: "john@example.com",
      address: "123 Oak Street",
    },
    {
      id: 2,
      name: "Luna",
      owner: "Sarah Johnson",
      petType: "cat",
      breed: "Persian",
      age: 3,
      phone: "+1 (555) 234-5678",
      email: "sarah@example.com",
      address: "456 Elm Avenue",
    },
    {
      id: 3,
      name: "Max",
      owner: "Mike Davis",
      petType: "dog",
      breed: "German Shepherd",
      age: 7,
      phone: "+1 (555) 345-6789",
      email: "mike@example.com",
      address: "789 Pine Road",
    },
  ]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const petTypeEmoji = {
    dog: "🐕",
    cat: "🐱",
    bird: "🐦",
    other: "🐾",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients & Pets</h1>
          <p className="text-gray-600 mt-2">Manage your patient records and pet information</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by patient or owner name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24" />
            <div className="p-6 -mt-12 relative">
              <div className="text-4xl mb-3">{petTypeEmoji[patient.petType as PetType]}</div>
              <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{patient.breed}</p>

              <div className="space-y-2 mb-4 text-sm">
                <p className="text-gray-600"><strong>Owner:</strong> {patient.owner}</p>
                <p className="text-gray-600"><strong>Age:</strong> {patient.age} years</p>
              </div>

              <div className="space-y-2 border-t pt-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone size={16} />
                  {patient.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Mail size={16} />
                  {patient.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} />
                  {patient.address}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No patients found</p>
        </div>
      )}
    </div>
  );
}
