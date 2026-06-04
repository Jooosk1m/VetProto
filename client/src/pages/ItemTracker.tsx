import { useState, useEffect } from "react"
import axios from "axios"

type Status = "OK" | "Low" | "Critical"

interface Product {
  id: number
  name: string
  category: string
  stock: number
  maxStock: number
  price: number
  status: Status
}

const API = "/api"

function getStatus(stock: number, max: number): Status {
  if (stock === 0) return "Critical"
  if (stock <= max / 2) return "Low"
  return "OK"
}

export default function ItemTracker() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const [deleteItem, setDeleteItem] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Medicine" | "Supply" | "Food">("All")
  const [newItem, setNewItem] = useState({ name: "", category: "Medicine", stock: 0, maxStock: 30, price: 0 })
  const [editForm, setEditForm] = useState({ name: "", category: "Medicine", stock: 0, maxStock: 30, price: 0 })

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/products`)
      const withStatus = data.map((p: Omit<Product, "status">) => ({
        ...p,
        status: getStatus(p.stock, p.maxStock),
      }))
      setItems(withStatus)
    } catch (err) {
      console.error("Failed to fetch products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const addItem = async () => {
    if (!newItem.name.trim()) return
    try {
      await axios.post(`${API}/products`, newItem)
      await fetchProducts()
      setNewItem({ name: "", category: "Medicine", stock: 0, maxStock: 30, price: 0 })
      setShowAddModal(false)
    } catch (err) {
      console.error("Failed to add product:", err)
    }
  }

  const openEditModal = (item: Product) => {
    setSelectedItem(item)
    setEditForm({ name: item.name, category: item.category, stock: item.stock, maxStock: item.maxStock, price: item.price })
    setShowEditModal(true)
  }

  const handleEdit = async () => {
    if (!selectedItem) return
    try {
      await axios.put(`${API}/products/${selectedItem.id}`, editForm)
      await fetchProducts()
      setShowEditModal(false)
      setSelectedItem(null)
    } catch (err) {
      console.error("Failed to edit product:", err)
    }
  }

  const openDeleteModal = (item: Product) => {
    setDeleteItem(item)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!deleteItem) return
    try {
      await axios.delete(`${API}/products/${deleteItem.id}`)
      await fetchProducts()
      setShowDeleteModal(false)
      setDeleteItem(null)
    } catch (err) {
      console.error("Failed to delete product:", err)
    }
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

  const filteredItems = items.filter((item) =>
    selectedCategory === "All" || item.category === selectedCategory
  )

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1b3a2d]"

  if (loading) return <div className="text-sm text-gray-400 py-10 text-center">Loading inventory...</div>

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-end items-center gap-3 mb-5">
        <button onClick={fetchProducts} className="text-xs text-gray-400 hover:text-gray-600">↻ Refresh</button>
        <button onClick={() => setShowAddModal(true)} className="bg-[#1b3a2d] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#2d6a4f]">
          + Add item
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Item</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Item name" value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className={inputClass} />
              <select value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className={inputClass}>
                <option value="Medicine">Medicine</option>
                <option value="Supply">Supply</option>
                <option value="Food">Food</option>
              </select>
              <input type="number" placeholder="Current stock" value={newItem.stock}
                onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) || 0 })} className={inputClass} />
              <input type="number" placeholder="Max stock" value={newItem.maxStock}
                onChange={(e) => setNewItem({ ...newItem, maxStock: parseInt(e.target.value) || 30 })} className={inputClass} />
              <input type="number" placeholder="Unit price" value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} className={inputClass} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={addItem} className="flex-1 px-4 py-2 bg-[#1b3a2d] text-white rounded-lg text-sm font-medium hover:bg-[#2d6a4f]">Add Item</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Edit Item</h2>
            <p className="text-xs text-gray-400 mb-4">Editing: {selectedItem.name}</p>
            <div className="space-y-3">
              <input type="text" placeholder="Item name" value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className={inputClass} />
              <select value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className={inputClass}>
                <option value="Medicine">Medicine</option>
                <option value="Supply">Supply</option>
                <option value="Food">Food</option>
              </select>
              <input type="number" placeholder="Current stock" value={editForm.stock}
                onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })} className={inputClass} />
              <input type="number" placeholder="Max stock" value={editForm.maxStock}
                onChange={(e) => setEditForm({ ...editForm, maxStock: parseInt(e.target.value) || 30 })} className={inputClass} />
              <input type="number" placeholder="Unit price" value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })} className={inputClass} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-[#1b3a2d] text-white rounded-lg text-sm font-medium hover:bg-[#2d6a4f]">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && deleteItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-lg">🗑</div>
              <h2 className="text-lg font-bold text-gray-900">Delete Item</h2>
            </div>
            <p className="text-sm text-gray-600 mb-1">Are you sure you want to delete:</p>
            <p className="text-sm font-semibold text-gray-900 mb-4">"{deleteItem.name}"</p>
            <p className="text-xs text-red-500 mb-4">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {items.filter((i) => i.status === "Critical").map((item) => (
        <div key={`critical-${item.id}`} className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700 mb-2">
          ⚠️ <span><b>{item.name}</b> is critically low — {item.stock} units remaining</span>
        </div>
      ))}
      {items.filter((i) => i.status === "Low").map((item) => (
        <div key={`low-${item.id}`} className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-sm text-amber-800 mb-2">
          🟠 <span><b>{item.name}</b> is running low — reorder soon</span>
        </div>
      ))}
      {items.every((i) => i.status === "OK") && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 text-sm text-emerald-700 mb-4">
          ✓ <span>All items are in stock</span>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(["All", "Medicine", "Supply", "Food"] as const).map((tab) => (
          <button key={tab} onClick={() => setSelectedCategory(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all
              ${selectedCategory === tab
                ? "bg-[#1b3a2d] text-white border-[#1b3a2d]"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}>
            {tab === "Supply" ? "Supplies" : tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">All inventory items</span>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {filteredItems.length} items
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Item", "Category", "In Stock", "Stock Level", "Unit Price", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-sm text-gray-700">{item.name}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryStyle[item.category]}`}>{item.category}</span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{item.stock} units</td>
                <td className="px-5 py-3">
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${barColor[item.status]}`}
                      style={{ width: `${Math.min((item.stock / item.maxStock) * 100, 100)}%` }} />
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-700">₱{item.price.toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyle[item.status]}`}>{item.status}</span>
                </td>
                <td className="px-5 py-3 flex gap-2">
                  <button onClick={() => openEditModal(item)}
                    className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => openDeleteModal(item)}
                    className="text-xs font-medium px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}