// src/pages/receipts/ReceiptList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchReceipts } from "../../../slices/purchases/purchaseReceiptSlice";


export default function PurchaseRequestList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get receipts from Redux store
  const receipts = useSelector((state) => state.receipts.list);

  useEffect(() => {
    // Fetch receipts if the store is empty
    if (!receipts.length) {
      dispatch(fetchReceipts());
    }
  }, [dispatch, receipts.length]);

  return (
    <div style={{ padding: "16px" }}>
      <h2>Receipts</h2>
      <button onClick={() => navigate("/receipts/add")}>Add Receipt</button>

      <table style={{ width: "100%", marginTop: "16px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Purchase Order</th>
            <th>Receipt Number</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipts.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No receipts found
              </td>
            </tr>
          )}
          {receipts.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.supplier?.name}</td>
              <td>{r.purchaseOrder?.name}</td>
              <td>{r.receipt_number}</td>
              <td>{r.date}</td>
              <td>{r.total}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => navigate(`/receipts/edit/${r.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}