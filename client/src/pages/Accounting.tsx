import { useState } from "react"

const monthlyBars = [
  { month: "Jan", value: 8200,  height: 55 },
  { month: "Feb", value: 9100,  height: 62 },
  { month: "Mar", value: 7800,  height: 52 },
  { month: "Apr", value: 12400, height: 84 },
  { month: "May", value: 14820, height: 100, current: true },
  { month: "Jun", value: 0, height: 0, future: true },
  { month: "Jul", value: 0, height: 0, future: true },
  { month: "Aug", value: 0, height: 0, future: true },
  { month: "Sep", value: 0, height: 0, future: true },
  { month: "Oct", value: 0, height: 0, future: true },
  { month: "Nov", value: 0, height: 0, future: true },
  { month: "Dec", value: 0, height: 0, future: true },
]

const breakdown = [
  { name: "Medicine", amount: 9200, pct: 62, color: "bg-emerald-600" },
  { name: "Supplies", amount: 3100, pct: 21, color: "bg-amber-400" },
  { name: "Food",     amount: 2520, pct: 17, color: "bg-blue-500" },
]

const transactions = [
  { date: "May 28", items: "Amoxicillin 250mg, Collar (M)", payment: "Cash", amount: 230.00 },
  { date: "May 27", items: "Rabies Vaccine × 2",            payment: "Card", amount: 640.00 },
  { date: "May 27", items: "Dog Dewormer, Cat Dry Food 1kg", payment: "Cash", amount: 390.00 },
  { date: "May 26", items: "Flea Treatment Spray",          payment: "Cash", amount: 195.00 },
]

export default function Accounting() {
  const [period, setPeriod] = useState("Monthly")

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
          <p className="text-2xl font-bold text-gray-900 mb-1">₱14,820</p>
          <p className="text-xs text-emerald-600 font-medium">+12% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">47</p>
          <p className="text-xs text-gray-400">This month</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Avg. Per Transaction</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">₱315</p>
          <p className="text-xs text-gray-400">This month</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Top Category</p>
          <p className="text-xl font-bold text-gray-900 mb-1">Medicine</p>
          <p className="text-xs text-gray-400">62% of sales</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-[1fr_300px] gap-4 mb-5">

        {/* Bar chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-800">Monthly revenue</span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">2025</span>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {monthlyBars.map((bar) => (
              <div key={bar.month} className="flex flex-col items-center gap-1 flex-1">
                {bar.current && (
                  <span className="text-[9px] font-semibold text-emerald-700">₱14.8k</span>
                )}
                {!bar.current && <span className="text-[9px] text-transparent">x</span>}
                <div
                  className={`w-full rounded-t-sm transition-all
                    ${bar.future ? "bg-gray-100" : bar.current ? "bg-emerald-700" : "bg-emerald-300"}`}
                  style={{ height: `${bar.future ? 6 : (bar.height / 100) * 80}px` }}
                />
                <span className="text-[9px] text-gray-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sales breakdown */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-800">Sales breakdown</span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">This month</span>
          </div>
          <div className="flex flex-col">
            {breakdown.map((item) => (
              <div key={item.name} className="py-2.5 border-b border-gray-50 last:border-none">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">₱{item.amount.toLocaleString()}</span>
                    <span className="text-xs font-bold text-gray-800">{item.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3">
              <span className="text-sm font-bold text-gray-800">Total</span>
              <span className="text-sm font-bold text-gray-900">₱14,820</span>
            </div>
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
            {transactions.map((txn, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-sm text-gray-700">{txn.date}</td>
                <td className="px-5 py-3 text-sm text-gray-400">{txn.items}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full
                    ${txn.payment === "Cash"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-orange-50 text-orange-600"
                    }`}>
                    {txn.payment}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm font-semibold text-gray-800">
                  ₱{txn.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}