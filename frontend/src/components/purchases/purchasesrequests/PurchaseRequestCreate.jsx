// src/pages/purchaseRequests/PurchaseRequestCreate.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierPicker from "../../../components/pickers/SupplierPicker";
import { useNavigate } from "react-router-dom";
import { createPurchaseRequest, setFormField } from "../../../store/purchaseRequestSlice";

export default function PurchaseRequestCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.purchaseRequest);

  const [form, setForm] = useState({
    supplier_id: "",
    description: "",
    date: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPurchaseRequest(form)).unwrap();
      navigate("/purchase-requests"); // go back to the list after creation
    } catch (err) {
      console.error("Failed to save purchase request:", err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Create Purchase Request</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <SupplierPicker
          value={form.supplier_id}
          onChange={(id) => setForm((prev) => ({ ...prev, supplier_id: id }))}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
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

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}