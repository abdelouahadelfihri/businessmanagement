// src/components/pickers/PurchaseOrderPicker.jsx
import React from "react";
import EntityPicker from "./EntityPicker";

// apiGet / apiAdd functions using fetch — adapt endpoints if needed
async function apiGetPurchaseOrders() {
  const res = await fetch("/api/purchase-orders");
  if (!res.ok) throw new Error("Failed to fetch purchase orders");
  return res.json();
}

async function apiAddPurchaseOrder(payload) {
  // payload should contain at least { order_number or supplier_id or order_date } depending on your backend needs
  const res = await fetch("/api/purchase-orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create purchase order");
  return res.json();
}

export default function PurchaseOrderPicker(props) {
  return (
    <EntityPicker
      apiGet={apiGetPurchaseOrders}
      apiAdd={apiAddPurchaseOrder}
      label="Purchase Order"
      {...props}
    />
  );
}