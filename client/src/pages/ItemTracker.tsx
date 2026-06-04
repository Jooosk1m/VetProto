import { useState, useEffect } from "react"

const defaultItems = [
  { name: "Amoxicillin 250mg",    category: "Medicine" as const, stock: 4,  max: 30, price: 85.00,  status: "Critical" as const },
  { name: "Rabies Vaccine",       category: "Medicine" as const, stock: 22, max: 30, price: 320.00, status: "OK" as const },
  { name: "Flea Treatment Spray", category: "Supply" as const,   stock: 8,  max: 30, price: 195.00, status: "Low" as const },
  { name: "Dog Dewormer",         category: "Medicine" as const, stock: 35, max: 40, price: 110.00, status: "OK" as const },
  { name: "Cat Dry Food 1kg",     category: "Food" as const,     stock: 18, max: 30, price: 280.00, status: "OK" as const },
  { name: "Elizabethan Collar (M)", category: "Supply" as const, stock: 12, max: 25, price: 145.00, status: "OK" as const },
  { name: "Ivermectin 10ml",      category: "Medicine" as const, stock: 27, max: 35, price: 230.00, status: "OK" as const },
  { name: "Puppy Milk Formula",   category: "Food" as const,     stock: 6,  max: 25, price: 390.00, status: "Low" as const },
]

export default function ItemTracker() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRestockModal, setShowRestockModal] = useState(false)
  const [restockItem, setRestockItem] = useState<string | null>(null)
  const [restockQty, setRestockQty] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Medicine" | "Supply" | "Food">("All")
  const [newItem, setNewItem] = useState({ name: "", category: "Medicine" as const, stock: 0, max: 30, price: 0 })
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("vetpro_inventory")
    return saved ? JSON.parse(saved) : defaultItems
  })

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("vetpro_inventory", JSON.stringify(items))
  }, [items])

  const addItem = () => {
    if (newItem.name.trim()) {
      setItems([...items, { ...newItem, status: newItem.stock > newItem.max / 2 ? "OK" : newItem.stock > 0 ? "Low" : "Critical" }])
      setNewItem({ name: "", category: "Medicine", stock: 0, max: 30, price: 0 })
      setShowAddModal(false)
    }
  }

  const deleteItem = (itemName: string) => {
    setItems(items.filter((item) => item.name !== itemName))
  }

  const handleRestock = () => {
    if (restockItem && restockQty > 0) {
      setItems(items.map((item) => {
        if (item.name === restockItem) {
          const newStock = item.stock + restockQty
          return {
            ...item,
            stock: newStock,
            status: newStock > item.max / 2 ? "OK" : newStock > 0 ? "Low" : "Critical",
          }
        }
        return item
      }))
      setRestockItem(null)
      setRestockQty(0)
      setShowRestockModal(false)
    }
  }

  const openRestockModal = (itemName: string) => {
    setRestockItem(itemName)
    setRestockQty(0)
    setShowRestockModal(true)
  }

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
        <button onClick={() => setShowAddModal(true)} className="bg-[#1b3a2d] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#2d6a4f]">
          + Add item
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Item</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value as "Medicine" | "Supply" | "Food" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"
              >
                <option value="Medicine">Medicine</option>
                <option value="Supply">Supply</option>
                <option value="Food">Food</option>
              </select>
              <input
                type="number"
                placeholder="Current stock"
                value={newItem.stock}
                onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"
              />
              <input
                type="number"
                placeholder="Max stock"
                value={newItem.max}
                onChange={(e) => setNewItem({ ...newItem, max: parseInt(e.target.value) || 30 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"
              />
              <input
                type="number"
                placeholder="Unit price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="flex-1 px-4 py-2 bg-[#1b3a2d] text-white rounded-lg text-sm font-medium hover:bg-[#2d6a4f]"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {items
        .filter((item) => item.status === "Critical")
        .map((item) => (
          <div key={`critical-${item.name}`} className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700 mb-2">
            ⚠️ <span><b>{item.name}</b> is critically low — {item.stock} units remaining</span>
          </div>
        ))}
      {items
        .filter((item) => item.status === "Low")
        .map((item) => (
          <div key={`low-${item.name}`} className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-sm text-amber-800 mb-2">
            🟠 <span><b>{item.name}</b> is running low — reorder soon</span>
          </div>
        ))}
      {items.every((item) => item.status === "OK") && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 text-sm text-emerald-700 mb-4">
          ✓ <span>All items are in stock</span>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {["All", "Medicine", "Supplies", "Food"].map((tab) => {
          const isActive = selectedCategory === "All" && tab === "All" || (tab === "Supplies" && selectedCategory === "Supply") || (selectedCategory === tab && selectedCategory !== "Supply")
          return (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab === "Supplies" ? "Supply" : (tab as any))}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all
                ${isActive
                  ? "bg-[#1b3a2d] text-white border-[#1b3a2d]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">All inventory items</span>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {items.filter((item) => selectedCategory === "All" || (selectedCategory === "Supply" ? item.category === "Supply" : item.category === selectedCategory)).length} items
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Item", "Category", "In Stock", "Stock Level", "Unit Price", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => selectedCategory === "All" || (selectedCategory === "Supply" ? item.category === "Supply" : item.category === selectedCategory))
              .map((item) => (
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
                <td className="px-5 py-3 flex gap-2">
                  <button
                    onClick={() => openRestockModal(item.name)}
                    className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Restock
                  </button>
                  <button
                    onClick={() => deleteItem(item.name)}
                    className="text-xs font-medium px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Restock Modal */}
      {showRestockModal && restockItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Restock: {restockItem}</h2>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Quantity to add"
                value={restockQty}
                onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"
              />
              <p className="text-xs text-gray-500">
                Current stock: {items.find((i) => i.name === restockItem)?.stock || 0} units
              </p>
              <p className="text-xs text-gray-500">
                New stock will be: {(items.find((i) => i.name === restockItem)?.stock || 0) + restockQty} units
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowRestockModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRestock}
                className="flex-1 px-4 py-2 bg-[#1b3a2d] text-white rounded-lg text-sm font-medium hover:bg-[#2d6a4f]"
              >
                Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}