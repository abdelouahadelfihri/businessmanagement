// src/pages/receipts/ReceiptList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchReceipts } from "../../slices/purchases/purchaseReceiptSlice";

export default function PurchaseReceiptList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const receipts = useSelector((state) => state.receipts.list || []);

  useEffect(() => {
    if (!receipts.length) dispatch(fetchReceipts());
  }, [dispatch, receipts.length]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Receipts</h2>
      <button onClick={() => navigate("/receipts/create")}>Add Receipt</button>

      <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>ID</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Supplier</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Purchase Order</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Receipt #</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Date</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Total</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Status</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipts.length === 0 && (
            <tr><td colSpan="8" style={{ textAlign: "center", padding: 16 }}>No receipts found</td></tr>
          )}
          {receipts.map((r) => (
            <tr key={r.id}>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.id}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.supplier?.name || "-"}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.purchaseOrder?.order_number || r.purchaseOrder?.id || "-"}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.receipt_number}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.date}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.total}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{r.status}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                <button onClick={() => navigate(`/receipts/edit/${r.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}