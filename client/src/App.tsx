// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"

// Pages — you need at least one
import Accounting from "./pages/Accounting"
import Cashier from "./pages/Cashier"
import ItemTracker from "./pages/ItemTracker"
import TransactionReport from "./pages/Transaction"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Accounting />} /> 
          <Route path="/cashier" element={<Cashier />}/>
          <Route path="/itemtracker" element={<ItemTracker />} />
          <Route path="/transaction" element={<TransactionReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}