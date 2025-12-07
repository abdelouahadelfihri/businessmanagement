// src/components/pickers/RequestPicker.jsx
import React from "react";
import { useDispatch } from "react-redux";
import EntityPicker from "./EntityPicker";
import { fetchPurchaseRequests, addPurchaseRequestThunk } from "../../slices/purchases/purchaseRequestSlice";

export default function RequestPicker({ value, onChange }) {
  const dispatch = useDispatch();

  return (
    <EntityPicker
      apiGet={() => dispatch(fetchPurchaseRequests()).unwrap()}
      apiAdd={(data) => dispatch(addPurchaseRequestThunk(data)).unwrap()}
      label="Purchase Request"
      value={value}
      onChange={onChange}
    />
  );
}