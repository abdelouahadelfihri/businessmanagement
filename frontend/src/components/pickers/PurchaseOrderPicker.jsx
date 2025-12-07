// src/components/pickers/OrderPicker.jsx
import React from "react";
import { useDispatch } from "react-redux";
import EntityPicker from "./EntityPicker";
import { fetchPurchaseOrders, addPurchaseOrderThunk } from "../../slices/purchases/purchaseOrderSlice";

export default function OrderPicker({ value, onChange }) {
  const dispatch = useDispatch();

  return (
    <EntityPicker
      apiGet={() => dispatch(fetchPurchaseOrders()).unwrap()}
      apiAdd={(data) => dispatch(addPurchaseOrderThunk(data)).unwrap()}
      label="Purchase Order"
      value={value}
      onChange={onChange}
    />
  );
}