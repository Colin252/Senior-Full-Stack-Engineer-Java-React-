import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Organizations from "./pages/Organizations/Organizations";
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import Payments from "./pages/Payments/Payments";

import InventoryPage from "./modules/inventory/InventoryPage";

import Accounting from "./pages/Accounting/Accounting";
import Finance from "./pages/Finance/Finance";
import Analytics from "./pages/Analytics/Analytics";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="organizations" element={<Organizations />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="finance" element={<Finance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;