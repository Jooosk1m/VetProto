import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layout
import MainLayout from "./componets/MainLayout";

//Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

//Cashier-Pages
import Accounting from "./pages/Cashier/Accounting";
import Cashier from "./pages/Cashier/Cashier";
import ItemTracker from "./pages/Cashier/ItemTracker";
import TransactionReport from "./pages/Cashier/Transaction";

//Clinic Pages
import PatientsAndPets from "./pages/Clinic/PatientsAndPets";
import Appointments from "./pages/Clinic/Appointments";
import MedicalRecords from "./pages/Clinic/MedicalRecords";

//Finance Pages
import BillingAndInvoices from "./pages/Finance/BillingAndInvoices";

//Admin Pages
import AdminOverview from "./pages/Admin/AdminOverview";
import StaffManagement from "./pages/Admin/StaffManagement";
import ReportsAndAnalysis from "./pages/Admin/ReportsAndAnalysis";
import Settings from "./pages/Admin/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/reports" element={<ReportsAndAnalysis />} />
          <Route path="/settings" element={<Settings />} />

          {/* CLINIC */}
          <Route path="/patients" element={<PatientsAndPets />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medical-records" element={<MedicalRecords />} />

          {/* FINANCE */}
          <Route path="/billing" element={<BillingAndInvoices />} />
          <Route path="/transaction" element={<TransactionReport />} />

          {/* CASHIER */}
          <Route path="/Accounting" element={<Accounting />} />
          <Route path="/Cashier" element={<Cashier />} />
          <Route path="/ItemTracker" element={<ItemTracker />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}