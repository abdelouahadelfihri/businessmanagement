import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SupplierCreate from "./components/purchases/suppliers/SupplierCreate"
import SupplierList from "./components/purchases/suppliers/SupplierList"
import PurchaseRequestCreate from "./components/purchases/purchasesRequests/PurchaseRequestCreate"
import PurchaseRequestList from "./components/purchases/purchasesRequests/PurchaseRequestList"
import PurchaseOrderCreate from "./components/purchases/purchasesOrders/PurchaseOrderCreate"
import PurchaseOrderList from "./components/purchases/purchasesOrders/PurchaseOrderList"

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="d-flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex-grow-1 p-4">
          <Routes>
            {/* ------------------- PURCHASES ------------------- */}
            <Route path="/purchases/suppliers/new" element={<SupplierCreate />} />
            <Route path="/purchases/suppliers/list" element={<SupplierList />} />

            <Route path="/purchases/requests/new" element={<PurchaseRequestCreate />} />
            <Route path="/purchases/requests/list" element={<PurchaseRequestList/>} />

            <Route path="/purchases/orders/new" element={<PurchaseOrderCreate />} />
            <Route path="/purchases/orders/list" element={<PurchaseOrderList />} />

            <Route path="/purchases/receipts/new" element={<PurchaseOrderCreate />} />
            <Route path="/purchases/receipts/list" element={<PurchaseOrderCreate />} />

            <Route path="/purchases/invoices/new" element={<PurchaseOrderCreate />} />
            <Route path="/purchases/invoices/list" element={<PurchaseOrderCreate />} />

            {/* ------------------- SALES ------------------- */}
            <Route path="/sales/customers/new" element={<PurchaseOrderCreate />} />
            <Route path="/sales/customers/list" element={<PurchaseOrderCreate />} />

            <Route path="/sales/quotes/new" element={<PurchaseOrderCreate />} />
            <Route path="/sales/quotes/list" element={<PurchaseOrderCreate />} />

            <Route path="/sales/orders/new" element={<PurchaseOrderCreate />} />
            <Route path="/sales/orders/list" element={<PurchaseOrderCreate />} />

            <Route path="/sales/deliveries/new" element={<PurchaseOrderCreate />} />
            <Route path="/sales/deliveries/list" element={<PurchaseOrderCreate />} />

            <Route path="/sales/invoices/new" element={<PurchaseOrderCreate />} />
            <Route path="/sales/invoices/list" element={<PurchaseOrderCreate />} />

            {/* ------------------- MASTER DATA ------------------- */}
            <Route path="/master/products/new" element={<PurchaseOrderCreate />} />
            <Route path="/master/products/list" element={<PurchaseOrderCreate />} />

            <Route path="/master/categories/new" element={<PurchaseOrderCreate />} />
            <Route path="/master/categories/list" element={<PurchaseOrderCreate />} />

            <Route path="/master/units/new" element={<PurchaseOrderCreate />} />
            <Route path="/master/units/list" element={<PurchaseOrderCreate />} />

            <Route path="/master/warehouses/new" element={<PurchaseOrderCreate />} />
            <Route path="/master/warehouses/list" element={<PurchaseOrderCreate />} />

            <Route path="/master/inventories/new" element={<PurchaseOrderCreate />} />
            <Route path="/master/inventories/list" element={<PurchaseOrderCreate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;