// src/pages/receipts/ReceiptEdit.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReceipt, fetchReceipts } from "../../redux/receiptSlice";
import SupplierPicker from "../../components/pickers/SupplierPicker";
import PurchaseOrderPicker from "../../components/pickers/PurchaseOrderPicker";
import { useNavigate, useParams } from "react-router-dom";

export default function ReceiptEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const receipts = useSelector((state) => state.receipts.list);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!receipts.length) {
      dispatch(fetchReceipts());
    } else {
      const receipt = receipts.find((r) => r.id === parseInt(id));
      if (receipt) setForm(receipt);
    }
  }, [receipts, dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateReceipt({ id, data: form }));
    navigate("/receipts");
  };

  if (!form) return <div>Loading...</div>;

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

      <button type="submit">Update</button>
    </form>
  );
}