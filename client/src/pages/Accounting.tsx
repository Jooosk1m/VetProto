import { useState, useEffect } from "react"
import axios from "../api/axios"

type Transaction = {
  id: number
  items: Array<{ name: string; price: number; qty: number }>
  total: number
  payment: string
  createdAt: string
}

export default function Accounting() {
  const [period, setPeriod] = useState("Monthly")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/transactions")
      setTransactions(response.data)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats from transactions
  const calculateStats = () => {
    if (transactions.length === 0) {
      return {
        totalRevenue: 0,
        transactionCount: 0,
        avgPerTransaction: 0,
        breakdown: [],
        monthlyBars: [],
      }
    }

    const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0)
    const avgPerTransaction = totalRevenue / transactions.length

    // Calculate breakdown by category
    const categoryTotals: Record<string, number> = {}
    const categoryNames = {
      medicine: ["Amoxicillin", "Rabies Vaccine", "Dog Dewormer", "Ivermectin"],
      supplies: ["Flea Treatment", "Collar"],
      food: ["Food", "Milk Formula"],
    }

    transactions.forEach((txn) => {
      txn.items.forEach((item) => {
        let category = "Other"
        if (categoryNames.medicine.some((m) => item.name.includes(m))) category = "Medicine"
        else if (categoryNames.supplies.some((s) => item.name.includes(s))) category = "Supplies"
        else if (categoryNames.food.some((f) => item.name.includes(f))) category = "Food"

        categoryTotals[category] = (categoryTotals[category] || 0) + item.price * item.qty
      })
    })

    const breakdown = Object.entries(categoryTotals).map(([name, amount]) => ({
      name,
      amount,
      pct: Math.round((amount / totalRevenue) * 100),
      color: name === "Medicine" ? "bg-emerald-600" : name === "Supplies" ? "bg-amber-400" : "bg-blue-500",
    }))

    return {
      totalRevenue,
      transactionCount: transactions.length,
      avgPerTransaction,
      breakdown,
    }
  }

  const stats = calculateStats()
  const topCategory = stats.breakdown.length > 0 ? stats.breakdown[0] : null

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
        <div className="flex gap-2">
          {["Monthly", "Quarterly", "Annual"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${period === p
                  ? "bg-[#1b3a2d] text-white border-[#1b3a2d]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Revenue This Month</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">₱{stats.totalRevenue.toLocaleString("en", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-emerald-600 font-medium">{transactions.length} sales</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.transactionCount}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Avg. Per Transaction</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">₱{Math.round(stats.avgPerTransaction)}</p>
          <p className="text-xs text-gray-400">Average</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Top Category</p>
          <p className="text-xl font-bold text-gray-900 mb-1">{topCategory?.name || "—"}</p>
          <p className="text-xs text-gray-400">{topCategory?.pct || 0}% of sales</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-[1fr_300px] gap-4 mb-5">

        {/* Bar chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-800">Revenue breakdown</span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{transactions.length} sales</span>
          </div>
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No transactions yet</p>
          ) : (
            <div>
              <div className="mb-6 pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-emerald-700">₱{stats.totalRevenue.toLocaleString("en", { maximumFractionDigits: 0 })}</p>
              </div>
              
              <div className="flex items-end gap-2 h-24">
                  {stats.breakdown.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center w-full">No breakdown data</p>
                  ) : (
                    <>
                      {/* Bars — fixed height, grow from bottom */}
                      <div className="flex items-end gap-2 h-24">
                        {stats.breakdown.length === 0 ? (
                          <p className="text-xs text-gray-400 text-center w-full">
                            No breakdown data
                          </p>
                        ) : (
                          (() => {
                            const maxAmount = Math.max(
                              ...stats.breakdown.map((c) => c.amount)
                            )

                            return stats.breakdown.map((category) => {
                              const heightPercent =
                                maxAmount === 0
                                  ? 0
                                  : Math.max(5, (category.amount / maxAmount) * 100)

                              return (
                                <div
                                  key={category.name}
                                  className="flex-1 flex flex-col items-center justify-end"
                                >
                                  {/* THIS IS THE IMPORTANT FIX */}
                                  <div className="w-full h-24 flex items-end">
                                    <div
                                      className={`w-full rounded-t-md ${category.color}`}
                                      style={{
                                        height: `${heightPercent}%`,
                                        minHeight: "4px",
                                      }}
                                    />
                                  </div>

                                  <span className="text-[11px] font-medium text-gray-600 mt-2">
                                    {category.name}
                                  </span>

                                  <span className="text-[10px] text-gray-400">
                                    ₱{(category.amount / 1000).toFixed(1)}k
                                  </span>
                                </div>
                              )
                            })
                          })()
                        )}
                      </div>
                    </>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Sales breakdown */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-800">Sales breakdown</span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">This month</span>
          </div>
          <div className="flex flex-col">
            {stats.breakdown.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No sales data</p>
            ) : (
              <>
                {stats.breakdown.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}
                    className={`py-2.5 border-b border-gray-50 last:border-none text-left transition-colors hover:bg-gray-50
                      ${selectedCategory === item.name ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">₱{item.amount.toLocaleString("en", { maximumFractionDigits: 0 })}</span>
                        <span className="text-xs font-bold text-gray-800">{item.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </button>
                ))}
                <div className="flex justify-between items-center pt-3">
                  <span className="text-sm font-bold text-gray-800">Total</span>
                  <span className="text-sm font-bold text-gray-900">₱{stats.totalRevenue.toLocaleString("en", { maximumFractionDigits: 0 })}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">Recent transactions</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {["Date", "Items", "Payment", "Amount"].map((h) => (
                <th key={h} className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-4 text-center text-gray-400 text-sm">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-4 text-center text-gray-400 text-sm">
                  No transactions yet. Complete a sale in the Cashier to see it here.
                </td>
              </tr>
            ) : (
              transactions
                .filter((txn) => {
                  if (!selectedCategory) return true
                  return txn.items.some((item) => item.name.toLowerCase().includes(selectedCategory.toLowerCase()))
                })
                .map((txn) => {
                  const itemsDisplay = txn.items
                    .map((item) => `${item.name} × ${item.qty}`)
                    .join(", ")
                  const date = new Date(txn.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })

                  return (
                    <tr key={txn.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-sm text-gray-700">{date}</td>
                      <td className="px-5 py-3 text-sm text-gray-400">{itemsDisplay}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full
                            ${txn.payment === "Cash"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-orange-50 text-orange-600"
                            }`}
                        >
                          {txn.payment}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm font-semibold text-gray-800">
                        ₱{txn.total.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}