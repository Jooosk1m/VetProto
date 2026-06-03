import { useState } from "react"

type CartItem = {
  name: string
  price: number
  qty: number
}

const products = [
  { name: "Amoxicillin 250mg",     price: 85.00,  stock: 4  },
  { name: "Rabies Vaccine",        price: 320.00, stock: 22 },
  { name: "Flea Treatment Spray",  price: 195.00, stock: 8  },
  { name: "Dog Dewormer",          price: 110.00, stock: 35 },
  { name: "Cat Dry Food 1kg",      price: 280.00, stock: 18 },
  { name: "Elizabethan Collar (M)", price: 145.00, stock: 12 },
  { name: "Ivermectin 10ml",       price: 230.00, stock: 27 },
  { name: "Puppy Milk Formula",    price: 390.00, stock: 6  },
]

export default function Cashier() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [payment, setPayment] = useState<"Cash" | "Card">("Cash")

  const addToCart = (product: { name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === product.name)
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { name: product.name, price: product.price, qty: 1 }]
    })
  }

  const changeQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => i.name === name ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    )
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  })

  return (
    <div>
      {/* Top bar */}
      <div className="flex justify-end mb-5">
        <span className="text-xs text-gray-400">{today}</span>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-5 h-[calc(100vh-120px)]">

        {/* Left — Products */}
        <div className="overflow-y-auto">
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

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => {
              const inCart = cart.find((i) => i.name === product.name)
              return (
                <button
                  key={product.name}
                  onClick={() => addToCart(product)}
                  className={`text-left bg-white rounded-xl p-4 border-2 transition-all shadow-sm hover:border-emerald-600
                    ${inCart ? "border-emerald-600 bg-emerald-50" : "border-transparent"}`}
                >
                  <p className="text-sm font-semibold text-gray-800 mb-1">{product.name}</p>
                  <p className="text-sm font-semibold text-emerald-700 mb-1">₱{product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{product.stock} in stock</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right — Transaction panel */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-800">Current transaction</span>
            <button
              onClick={() => setCart([])}
              className="text-xs text-red-500 font-medium hover:text-red-700"
            >
              Clear
            </button>
          </div>

          {/* Cart items */}
          <div className="flex flex-col gap-0 flex-1">
            {cart.length === 0 && (
              <p className="text-xs text-gray-300 text-center mt-8">No items yet — click a product</p>
            )}
            {cart.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-gray-50">
                <div>
                  <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">₱{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(item.name, -1)}
                    className="w-5 h-5 rounded border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => changeQty(item.name, 1)}
                    className="w-5 h-5 rounded border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-semibold text-gray-800 w-16 text-right">
                  ₱{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total + Pay */}
          <div className="border-t border-gray-100 pt-3 mt-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-800">Total</span>
              <span className="text-base font-bold text-gray-900">₱{total.toLocaleString("en", { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Payment method */}
            <div className="flex gap-2 mb-3">
              {(["Cash", "Card"] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPayment(method)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all
                    ${payment === method
                      ? "bg-emerald-50 border-[#1b3a2d] text-[#1b3a2d]"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                    }`}
                >
                  {method}
                </button>
              ))}
            </div>

            <button className="w-full bg-[#1b3a2d] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#2d6a4f] transition-colors">
              Complete sale
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Sales automatically deduct from item tracker
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}