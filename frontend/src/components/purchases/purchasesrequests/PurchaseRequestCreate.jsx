// src/pages/receipts/ReceiptAdd.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SupplierPicker from "../../../components/pickers/SupplierPicker";
import PurchaseOrderPicker from "../../../components/pickers/PurchaseOrderPicker";
import { useNavigate } from "react-router-dom";

export default function PurchaseRequestCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    await dispatch(addReceipt(form));
    navigate("/receipts");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <SupplierPicker
        value={form.supplier_id}
        onChange={(id) => setForm({ ...form, supplier_id: id })}
      />

      <PurchaseOrderPicker
        value={form.purchase_order_id}
        onChange={(id) => setForm({ ...form, purchase_order_id: id })}
      />

      <input
        type="text"
        placeholder="Receipt Number"
        value={form.receipt_number}
        onChange={(e) => setForm({ ...form, receipt_number: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        type="number"
        placeholder="Total"
        value={form.total}
        onChange={(e) => setForm({ ...form, total: e.target.value })}
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button type="submit">Save</button>
    </form>
  );
}