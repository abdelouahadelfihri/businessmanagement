// src/pages/receipts/PurchaseReceiptCreate.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addReceipt } from "../../slices/purchases/purchaseReceiptSlice";
import SupplierPicker from "../../components/pickers/SupplierPicker";
import PurchaseOrderPicker from "../../components/pickers/PurchaseOrderPicker";

export default function PurchaseReceiptCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const autoSelect = query.get("autoSelect") === "true"; // for pickers if used that way

  const [form, setForm] = useState({
    supplier_id: "",
    purchase_order_id: "",
    receipt_number: "",
    date: "",
    total: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReceipt = await dispatch(addReceipt(form)).unwrap();
      if (autoSelect) {
        try { dispatch({ type: "purchaseRequest/setReceipt", payload: newReceipt }); } catch {}
        return navigate(-1);
      }
      navigate("/receipts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Create Receipt</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
        <SupplierPicker value={form.supplier_id} onChange={(id) => setForm({ ...form, supplier_id: id })} />

        <PurchaseOrderPicker value={form.purchase_order_id} onChange={(id) => setForm({ ...form, purchase_order_id: id })} />

        <input name="receipt_number" placeholder="Receipt Number" value={form.receipt_number} onChange={(e) => setForm({ ...form, receipt_number: e.target.value })} />

        <input type="date" name="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <input type="number" name="total" placeholder="Total" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />

        <select name="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/receipts")} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}