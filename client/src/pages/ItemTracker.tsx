export default function ItemTracker() {
  const items = [
    { name: "Amoxicillin 250mg",    category: "Medicine", stock: 4,  max: 30, price: 85.00,  status: "Critical" },
    { name: "Rabies Vaccine",       category: "Medicine", stock: 22, max: 30, price: 320.00, status: "OK" },
    { name: "Flea Treatment Spray", category: "Supply",   stock: 8,  max: 30, price: 195.00, status: "Low" },
    { name: "Dog Dewormer",         category: "Medicine", stock: 35, max: 40, price: 110.00, status: "OK" },
    { name: "Cat Dry Food 1kg",     category: "Food",     stock: 18, max: 30, price: 280.00, status: "OK" },
    { name: "Elizabethan Collar (M)", category: "Supply", stock: 12, max: 25, price: 145.00, status: "OK" },
    { name: "Ivermectin 10ml",      category: "Medicine", stock: 27, max: 35, price: 230.00, status: "OK" },
    { name: "Puppy Milk Formula",   category: "Food",     stock: 6,  max: 25, price: 390.00, status: "Low" },
  ]

  const categoryStyle: Record<string, string> = {
    Medicine: "bg-emerald-50 text-emerald-700",
    Supply:   "bg-blue-50 text-blue-700",
    Food:     "bg-orange-50 text-orange-700",
  }

  const statusStyle: Record<string, string> = {
    OK:       "bg-emerald-50 text-emerald-700",
    Low:      "bg-orange-50 text-orange-700",
    Critical: "bg-red-50 text-red-600",
  }

  const barColor: Record<string, string> = {
    OK:       "bg-emerald-600",
    Low:      "bg-amber-400",
    Critical: "bg-red-500",
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-end items-center gap-3 mb-5">
        <span className="text-xs text-gray-400">Last updated: today, 9:41 AM</span>
        <button className="bg-[#1b3a2d] text-white text-xs font-medium px-4 py-2 rounded-lg">
          + Add item
        </button>
      </div>

      {/* Alerts */}
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700 mb-2">
        ⚠️ <span><b>Amoxicillin 250mg</b> is critically low — 4 units remaining</span>
      </div>
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-sm text-amber-800 mb-4">
        🟠 <span><b>Flea Treatment Spray</b> is running low — reorder soon</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {["All", "Medicine", "Supplies", "Food"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all
              ${i === 0
                ? "bg-[#1b3a2d] text-white border-[#1b3a2d]"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">All inventory items</span>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            8 items
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Item", "Category", "In Stock", "Stock Level", "Unit Price", "Status"].map((h) => (
                <th key={h} className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-sm text-gray-700">{item.name}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryStyle[item.category]}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{item.stock} units</td>
                <td className="px-5 py-3">
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor[item.status]}`}
                      style={{ width: `${Math.min((item.stock / item.max) * 100, 100)}%` }}
                    />
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-700">₱{item.price.toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}