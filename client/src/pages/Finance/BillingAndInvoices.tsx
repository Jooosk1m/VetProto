import { useState } from "react";
import { Plus, Search, DollarSign, Check, X, Download } from "lucide-react";

interface Invoice {
  id: number;
  invoiceNumber: string;
  petName: string;
  owner: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  description: string;
}

export default function BillingAndInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all");

  const [invoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: "INV-2026-001",
      petName: "Bella",
      owner: "John Smith",
      date: "2026-06-06",
      amount: 250.0,
      status: "paid",
      description: "Routine checkup and vaccination",
    },
    {
      id: 2,
      invoiceNumber: "INV-2026-002",
      petName: "Luna",
      owner: "Sarah Johnson",
      date: "2026-06-04",
      amount: 450.0,
      status: "pending",
      description: "Dental cleaning and extraction",
    },
    {
      id: 3,
      invoiceNumber: "INV-2026-003",
      petName: "Max",
      owner: "Mike Davis",
      date: "2026-05-20",
      amount: 320.0,
      status: "overdue",
      description: "Injury treatment and follow-up",
    },
    {
      id: 4,
      invoiceNumber: "INV-2026-004",
      petName: "Buddy",
      owner: "Emma Williams",
      date: "2026-06-01",
      amount: 180.0,
      status: "paid",
      description: "Vaccinations and health check",
    },
  ]);

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    paid: { bg: "bg-green-50", text: "text-green-700", icon: Check },
    pending: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "pending" },
    overdue: { bg: "bg-red-50", text: "text-red-700", icon: X },
  };

  const totalAmount = filtered.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = filtered.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600 mt-2">Manage invoices and payment tracking</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Paid</p>
              <p className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
            </div>
            <Check className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending/Overdue</p>
              <p className="text-2xl font-bold text-red-600">${(totalAmount - paidAmount).toFixed(2)}</p>
            </div>
            <X className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by invoice number, pet or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "paid", "pending", "overdue"] as const).map((status) => (
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

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Invoice</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Pet / Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((invoice) => {
                const StatusIcon = statusConfig[invoice.status].icon;
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <p className="font-medium">{invoice.petName}</p>
                      <p className="text-xs">{invoice.owner}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${invoice.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          statusConfig[invoice.status].bg
                        } ${statusConfig[invoice.status].text}`}
                      >
                        {StatusIcon === "pending" ? "●" : StatusIcon === Check ? "✓" : "✕"}{" "}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500 text-lg">No invoices found</p>
        </div>
      )}
    </div>
  );
}
