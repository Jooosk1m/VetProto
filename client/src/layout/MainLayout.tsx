// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom"

//Navigation Bar
import Navbar from "../componets/NavBar"

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#f5f5f0]">
      
      <aside className="w-60 bg-[#1b3a2d] flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
          <div>
            <p className="text-white text-sm font-semibold leading-tight">VetCare</p>
            <p className="text-white/40 text-xs">Pro</p>
          </div>
        </div>
        <Navbar/>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-7">
        <Outlet />
      </main>

    </div>
  )
}