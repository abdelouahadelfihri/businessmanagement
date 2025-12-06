// src/pages/receipts/ReceiptAdd.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierPicker from "../../../components/pickers/SupplierPicker";
import PurchaseOrderPicker from "../../../components/pickers/PurchaseOrderPicker";
import { useNavigate } from "react-router-dom";
import { createReceipt } from "../../../slices/receipts/receiptSlice"; // make sure this exists in your slice

export default function PurchaseRequestCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.receipts || {});

  const [form, setForm] = useState({
    supplier_id: "",
    purchase_order_id: "",
    receipt_number: "",
    date: "",
    total: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createReceipt(form)).unwrap(); // ensures proper async handling
      navigate("/receipts");
    } catch (err) {
      console.error("Failed to save receipt:", err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Add Receipt</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <SupplierPicker
          value={form.supplier_id}
          onChange={(id) => setForm((prev) => ({ ...prev, supplier_id: id }))}
        />

        <PurchaseOrderPicker
          value={form.purchase_order_id}
          onChange={(id) =>
            setForm((prev) => ({ ...prev, purchase_order_id: id }))
          }
        />

        <input
          type="text"
          name="receipt_number"
          placeholder="Receipt Number"
          value={form.receipt_number}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="total"
          placeholder="Total"
          value={form.total}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}