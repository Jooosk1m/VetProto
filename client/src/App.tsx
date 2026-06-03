// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"

// Pages — you need at least one
import Accouting from "./pages/Accounting"
import Cashier from "./pages/Cashier"
import ItemTracker from "./pages/ItemTracker"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Accouting />} /> 
          <Route path="/Cashier" element={<Cashier />}/>
          <Route path="/ItemTracker" element={<ItemTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}