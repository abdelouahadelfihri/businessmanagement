// src/pages/purchaseOrders/PurchaseOrderCreate.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createPurchaseOrder } from "../../../slices/purchases/purchaseOrderSlice";
import SupplierPicker from "../../../components/pickers/SupplierPicker";

export default function PurchaseOrderCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const autoSelect = query.get("autoSelect") === "true";

  const [form, setForm] = useState({
    supplier_id: "",
    request_id: "",
    order_date: "",
    status: "pending",
    total_amount: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrder = await dispatch(createPurchaseOrder(form)).unwrap();
      if (autoSelect) {
        // if using a purchase request slice with setPurchaseOrder action, dispatch it
        try { dispatch({ type: "purchaseRequest/setPurchaseOrder", payload: newOrder }); } catch {}
        return navigate(-1);
      }
      navigate("/purchase-orders");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Purchase Order</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
        <SupplierPicker value={form.supplier_id} onChange={(id) => setForm({ ...form, supplier_id: id })} />

        <input name="request_id" placeholder="Request ID (optional)" value={form.request_id} onChange={handleChange} />

        <input type="date" name="order_date" value={form.order_date} onChange={handleChange} required />

        <input type="number" name="total_amount" placeholder="Total amount" value={form.total_amount} onChange={handleChange} />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/purchase-orders")} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}