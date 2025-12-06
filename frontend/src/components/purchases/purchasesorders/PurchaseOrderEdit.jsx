// src/pages/purchaseOrders/PurchaseOrderEdit.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePurchaseOrder, fetchPurchaseOrders } from "../../slices/purchases/purchaseOrderSlice";

import SupplierPicker from "../../components/pickers/SupplierPicker";
import PurchaseRequestPicker from "../../components/pickers/PurchaseRequestPicker";

export default function PurchaseOrderEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector((state) => state.purchaseOrders.list || []);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!orders.length) dispatch(fetchPurchaseOrders());
    else {
      const order = orders.find((o) => String(o.id) === String(id));
      if (order) setForm(order);
    }
  }, [dispatch, orders, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePurchaseOrder({ id, data: form })).unwrap();
      navigate("/purchase-orders");
    } catch (err) {
      console.error(err);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Purchase Order</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 600,
        }}
      >
        {/* Supplier picker */}
        <SupplierPicker
          value={form.supplier_id}
          onChange={(supplierId) =>
            setForm({ ...form, supplier_id: supplierId })
          }
        />

        {/* Purchase Request picker */}
        <PurchaseRequestPicker
          value={form.request_id}
          onChange={(requestId) =>
            setForm({ ...form, request_id: requestId })
          }
        />

        <input
          type="date"
          name="order_date"
          value={form.order_date || ""}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="total_amount"
          placeholder="Total amount"
          value={form.total_amount || ""}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status || "pending"}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div>
          <button type="submit">Update</button>
          <button
            type="button"
            onClick={() => navigate("/purchase-orders")}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}