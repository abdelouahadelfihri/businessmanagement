// src/pages/purchaseOrders/PurchaseOrderList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchPurchaseOrders,
  setSelectedPurchaseOrder,
} from "../../../slices/purchases/purchaseOrderSlice";

export default function PurchaseOrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const orders = useSelector((state) => state.purchaseOrders.list || []);
  const query = new URLSearchParams(location.search);
  const selectMode = query.get("selectMode") === "true";

  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);

  const handleSelect = (order) => {
    if (selectMode) {
      dispatch(setSelectedPurchaseOrder(order)); // ✅ use the correct action
      navigate(-1);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Purchase Orders</h2>
      <button onClick={() => navigate("/purchase-orders/create")}>
        Add Purchase Order
      </button>

      {orders.length === 0 ? (
        <p style={{ marginTop: 16 }}>
          No purchase orders found. Click "Add Purchase Order" to create one.
        </p>
      ) : (
        <table
          style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>ID</th>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                Order #
              </th>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                Supplier
              </th>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Date</th>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Total</th>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Status</th>
              <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                onClick={() => selectMode && handleSelect(o)}
                style={{
                  cursor: selectMode ? "pointer" : "default",
                  background: selectMode ? "#fafafa" : "none",
                }}
              >
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  {o.id}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  {o.order_number || o.id}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  {o.supplier?.name || "-"}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  {o.order_date || "-"}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  {o.total_amount || "-"}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  {o.status || "-"}
                </td>
                <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/purchase-orders/edit/${o.id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}