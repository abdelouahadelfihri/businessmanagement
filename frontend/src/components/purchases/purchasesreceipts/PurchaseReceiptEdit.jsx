// src/pages/receipts/ReceiptEdit.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReceipt, fetchReceipts } from "../../slices/purchases/purchaseReceiptSlice";
import { useNavigate, useParams } from "react-router-dom";
import SupplierPicker from "../../components/pickers/SupplierPicker";
import PurchaseOrderPicker from "../../components/pickers/PurchaseOrderPicker";

export default function PurchaseReceiptEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const receipts = useSelector((state) => state.receipts.list || []);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!receipts.length) dispatch(fetchReceipts());
    else {
      const r = receipts.find((x) => String(x.id) === String(id));
      if (r) setForm(r);
    }
  }, [dispatch, receipts, id]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateReceipt({ id, data: form })).unwrap();
      navigate("/receipts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Receipt</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
        <SupplierPicker value={form.supplier_id} onChange={(id) => setForm({ ...form, supplier_id: id })} />

        <PurchaseOrderPicker value={form.purchase_order_id} onChange={(id) => setForm({ ...form, purchase_order_id: id })} />

        <input name="receipt_number" value={form.receipt_number || ""} onChange={handleChange} />

        <input type="date" name="date" value={form.date || ""} onChange={handleChange} />

        <input type="number" name="total" value={form.total || ""} onChange={handleChange} />

        <select name="status" value={form.status || "pending"} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/receipts")} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}