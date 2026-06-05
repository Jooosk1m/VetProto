import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layout
import MainLayout from "./componets/MainLayout";

//Cashier-Pages
import Accounting from "./pages/Cashier/Accounting";
import Cashier from "./pages/Cashier/Cashier";
import ItemTracker from "./pages/Cashier/ItemTracker";
import TransactionReport from "./pages/Cashier/Transaction";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          {/* CASHIER */}
          <Route path="/Accounting" element={<Accounting />} />
          <Route path="/Cashier" element={<Cashier />} />
          <Route path="/ItemTracker" element={<ItemTracker />} />

          {/* FINANCE */}
          <Route path="/transaction" element={<TransactionReport />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}