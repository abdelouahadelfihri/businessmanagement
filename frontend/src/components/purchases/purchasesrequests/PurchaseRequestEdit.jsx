// src/pages/purchaseRequests/PurchaseRequestEdit.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierPicker from "../../../components/pickers/SupplierPicker";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPurchaseRequest,
  updatePurchaseRequest,
  setFormField,
  clearForm,
} from "../../../slices/purchases/purchaseRequestSlice";

export default function PurchaseRequestEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, loading, error } = useSelector(
    (state) => state.purchaseRequest
  );

  // Load existing request on mount
  useEffect(() => {
    dispatch(clearForm()); // clear any old data
    dispatch(fetchPurchaseRequest(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormField({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePurchaseRequest({ id, data: form })).unwrap();
      navigate("/purchase-requests");
    } catch (err) {
      console.error("Failed to update purchase request:", err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Edit Purchase Request</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <SupplierPicker
          value={form.supplier_id}
          onChange={(id) =>
            dispatch(setFormField({ name: "supplier_id", value: id }))
          }
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
          {loading ? "Saving..." : "Update"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}