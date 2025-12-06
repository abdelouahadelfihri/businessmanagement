// src/components/pickers/PurchaseOrderPicker.jsx
import React from "react";
import { useDispatch } from "react-redux";
import EntityPicker from "./EntityPicker";
import { fetchPurchaseOrders, createPurchaseOrder } from "../../slices/purchases/purchaseOrderSlice";

export default function PurchaseOrderPicker(props) {
  const dispatch = useDispatch();

  return (
    <EntityPicker
      apiGet={() => dispatch(fetchPurchaseOrders()).unwrap()}
      apiAdd={(data) => dispatch(createPurchaseOrder(data)).unwrap()} // create new order
      label="Purchase Order"
      {...props}
    />
  );
}