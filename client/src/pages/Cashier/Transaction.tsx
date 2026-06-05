import { useState, useEffect } from "react"
import axios from "../../api/axios"

type TransactionItem = {
  name: string
  price: number
  qty: number
}

type Transaction = {
  id: number
  items: TransactionItem[]
  total: number
  payment: string
  createdAt: string
}

type SortKey = "date" | "total" | "items" | "payment"
type SortDir = "asc" | "desc"

export default function TransactionReport() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [paymentFilter, setPaymentFilter] = useState<"All" | "Cash" | "Card">("All")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const PER_PAGE = 10

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

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
    setCurrentPage(1)
  }

  const filtered = transactions
    .filter((t) => {
      const matchSearch =
        search.trim() === "" ||
        t.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase())) ||
        String(t.id).includes(search)

      const matchPayment = paymentFilter === "All" || t.payment === paymentFilter

      const txDate = new Date(t.createdAt)
      const matchFrom = dateFrom === "" || txDate >= new Date(dateFrom)
      const matchTo = dateTo === "" || txDate <= new Date(dateTo + "T23:59:59")

      return matchSearch && matchPayment && matchFrom && matchTo
    })
    .sort((a, b) => {
      let val = 0
      if (sortKey === "date") val = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      else if (sortKey === "total") val = a.total - b.total
      else if (sortKey === "items") val = a.items.length - b.items.length
      else if (sortKey === "payment") val = a.payment.localeCompare(b.payment)
      return sortDir === "asc" ? val : -val
    })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  // Summary stats from filtered results
  const totalRevenue = filtered.reduce((s, t) => s + t.total, 0)
  const cashCount = filtered.filter((t) => t.payment === "Cash").length
  const cardCount = filtered.filter((t) => t.payment === "Card").length
  const avgOrder = filtered.length > 0 ? totalRevenue / filtered.length : 0

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 text-gray-300 select-none">
      {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  )

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Report</h1>
          <p className="text-xs text-gray-400 mt-0.5">Full history of all completed sales</p>
        </div>
        <button
          onClick={fetchTransactions}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            ₱{totalRevenue.toLocaleString("en", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-gray-400">{filtered.length} transactions</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Avg. Order
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            ₱{Math.round(avgOrder).toLocaleString("en")}
          </p>
          <p className="text-xs text-gray-400">Per transaction</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Cash Sales
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{cashCount}</p>
          <p className="text-xs text-emerald-600 font-medium">
            {filtered.length > 0 ? Math.round((cashCount / filtered.length) * 100) : 0}% of total
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Card Sales
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{cardCount}</p>
          <p className="text-xs text-orange-500 font-medium">
            {filtered.length > 0 ? Math.round((cardCount / filtered.length) * 100) : 0}% of total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm px-5 py-4 mb-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by item or ID…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#1b3a2d]"
          />
        </div>

        {/* Payment filter */}
        <div className="flex gap-1.5">
          {(["All", "Cash", "Card"] as const).map((p) => (
            <button
              key={p}
              onClick={() => { setPaymentFilter(p); setCurrentPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${paymentFilter === p
                  ? "bg-[#1b3a2d] text-white border-[#1b3a2d]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">From</span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1) }}
            className="border border-gray-200 rounded-lg text-xs px-2 py-1.5 focus:outline-none focus:border-[#1b3a2d]"
          />
          <span className="text-xs text-gray-400">To</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1) }}
            className="border border-gray-200 rounded-lg text-xs px-2 py-1.5 focus:outline-none focus:border-[#1b3a2d]"
          />
          {(dateFrom || dateTo) && (
            <button
              onClick={() => { setDateFrom(""); setDateTo(""); setCurrentPage(1) }}
              className="text-xs text-red-400 hover:text-red-600"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">All Transactions</span>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {filtered.length} results
          </span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5 w-10">
                #
              </th>
              <th
                className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5 cursor-pointer hover:text-gray-600 select-none"
                onClick={() => handleSort("date")}
              >
                Date <SortIcon col="date" />
              </th>
              <th
                className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5 cursor-pointer hover:text-gray-600 select-none"
                onClick={() => handleSort("items")}
              >
                Items <SortIcon col="items" />
              </th>
              <th
                className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5 cursor-pointer hover:text-gray-600 select-none"
                onClick={() => handleSort("payment")}
              >
                Payment <SortIcon col="payment" />
              </th>
              <th
                className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5 cursor-pointer hover:text-gray-600 select-none"
                onClick={() => handleSort("total")}
              >
                Amount <SortIcon col="total" />
              </th>
              <th className="text-left text-[10.5px] font-semibold uppercase tracking-wide text-gray-400 px-5 py-2.5">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">
                  Loading transactions…
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">
                  No transactions match your filters.
                </td>
              </tr>
            ) : (
              paginated.map((txn, idx) => {
                const isExpanded = expandedId === txn.id
                const itemSummary = txn.items.map((i) => `${i.name} ×${i.qty}`).join(", ")

                return (
                  <>
                    <tr
                      key={txn.id}
                      className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${isExpanded ? "bg-emerald-50/40" : ""}`}
                    >
                      {/* Row number */}
                      <td className="px-5 py-3 text-xs text-gray-400">
                        {(currentPage - 1) * PER_PAGE + idx + 1}
                      </td>
                      {/* Date */}
                      <td className="px-5 py-3">
                        <p className="text-sm text-gray-700">{formatDate(txn.createdAt)}</p>
                        <p className="text-xs text-gray-400">{formatTime(txn.createdAt)}</p>
                      </td>
                      {/* Items summary */}
                      <td className="px-5 py-3 max-w-[240px]">
                        <p className="text-xs text-gray-500 truncate">{itemSummary}</p>
                        <p className="text-[11px] text-gray-300">{txn.items.length} item type{txn.items.length !== 1 ? "s" : ""}</p>
                      </td>
                      {/* Payment badge */}
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
                      {/* Total */}
                      <td className="px-5 py-3 text-sm font-semibold text-gray-800">
                        ₱{txn.total.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      {/* Expand toggle */}
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : txn.id)}
                          className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {isExpanded ? "Hide ▲" : "View ▼"}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded breakdown row */}
                    {isExpanded && (
                      <tr key={`${txn.id}-expanded`} className="bg-emerald-50/40 border-t border-emerald-100">
                        <td colSpan={6} className="px-10 py-4">
                          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                            Item Breakdown — Transaction #{txn.id}
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {txn.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between max-w-sm bg-white rounded-lg px-3 py-2 shadow-sm"
                              >
                                <span className="text-sm text-gray-700">{item.name}</span>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>×{item.qty}</span>
                                  <span>₱{item.price.toFixed(2)} ea.</span>
                                  <span className="font-semibold text-gray-800">
                                    ₱{(item.price * item.qty).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end max-w-sm mt-1">
                              <span className="text-sm font-bold text-gray-800">
                                Total: ₱{txn.total.toLocaleString("en", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && filtered.length > PER_PAGE && (
          <div className="flex justify-between items-center px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Showing {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg text-xs border border-gray-200 text-gray-500 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce<(number | "…")[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…")
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className="text-xs text-gray-300 px-1">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`w-7 h-7 rounded-lg text-xs font-medium transition-all
                        ${currentPage === p
                          ? "bg-[#1b3a2d] text-white"
                          : "border border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg text-xs border border-gray-200 text-gray-500 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}