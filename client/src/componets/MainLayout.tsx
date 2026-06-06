import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PawPrint,
  CalendarDays,
  FileText,
  Receipt,
  Package,
  Users,
  BarChart2,
  Settings,
  ClipboardMinus,
  ArrowLeftRight,
  Store,
} from "lucide-react";

export default function MainLayout({ children }: { children?: React.ReactNode }) {

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-blue-50 text-blue-700 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* SIDEBAR */}
      <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col py-5">

        {/* Clinic Header */}
        <div className="flex items-center gap-3 px-5 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <PawPrint size={20} color="white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">PawCare</p>
            <p className="text-xs text-gray-400">Clinic Admin</p>
          </div>
        </div>

        <hr className="border-gray-200 mb-3" />

        {/* OVERVIEW */}
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest px-2 mb-1">OVERVIEW</p>
          <NavLink to="/dashboard" className={navStyle}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
        </div>

        {/* CASHIER */}
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest px-2 mb-1">CASHIER</p>
          <NavLink to="/Accounting" className={navStyle}>
            <ClipboardMinus size={18} />
            Accounting
          </NavLink>
          <NavLink to="/Cashier" className={navStyle}>
            <Store size={18} />
            Cashier
          </NavLink>
          <NavLink to="/ItemTracker" className={navStyle}>
            <Package size={18} />
            Inventory & Tracker
          </NavLink>
        </div>

        {/* CLINIC */}
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest px-2 mb-1">CLINIC</p>
          <NavLink to="/patients" className={navStyle}>
            <PawPrint size={18} />
            Patients & Pets
          </NavLink>
          <NavLink to="/appointments" className={navStyle}>
            <CalendarDays size={18} />
            Appointments
          </NavLink>
          <NavLink to="/medical-records" className={navStyle}>
            <FileText size={18} />
            Medical Records
          </NavLink>
        </div>

        {/* FINANCE */}
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest px-2 mb-1">FINANCE</p>
          <NavLink to="/billing" className={navStyle}>
            <Receipt size={18} />
            Billing & Invoices
          </NavLink>
          <NavLink to="/transaction" className={navStyle}>
            <ArrowLeftRight size={18} />
            Transaction
          </NavLink>
        </div>

        {/* ADMIN */}
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest px-2 mb-1">ADMIN</p>
          <NavLink to="/admin" className={navStyle}>
            <LayoutDashboard size={18} />
            Admin Overview
          </NavLink>
          <NavLink to="/staff" className={navStyle}>
            <Users size={18} />
            Staff Management
          </NavLink>
          <NavLink to="/reports" className={navStyle}>
            <BarChart2 size={18} />
            Reports & Analytics
          </NavLink>
          <NavLink to="/settings" className={navStyle}>
            <Settings size={18} />
            Settings
          </NavLink>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}