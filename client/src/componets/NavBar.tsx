
import { NavLink } from "react-router-dom"
import { LayoutGrid, Receipt, TrendingUp } from "lucide-react"


export default function Navbar() {
  const navItem = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
    ${isActive
      ? "bg-[#2d6a4f] text-white"
      : "text-white/50 hover:bg-white/10 hover:text-white/85"
    }`
  return (
    <nav className="flex flex-col gap-0.5 p-2.5">
          <NavLink to="/itemtracker"  className={navItem}>
            <LayoutGrid size={15} /> Item Tracker
          </NavLink>

          <NavLink to="/cashier"       className={navItem}>
            <Receipt size={15} /> Cashier
          </NavLink>

          <NavLink to="/"    className={navItem}>
            <TrendingUp size={15} /> Accounting
          </NavLink>
    </nav>
  )
}