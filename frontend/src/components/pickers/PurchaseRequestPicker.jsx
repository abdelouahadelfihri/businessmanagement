// src/components/pickers/PurchaseRequestPicker.jsx
import React from "react";
import { useDispatch } from "react-redux";
import EntityPicker from "./EntityPicker";
import { fetchPurchaseRequests, savePurchaseRequest } from "../../slices/purchases/purchaseRequestSlice";

export default function PurchaseRequestPicker(props) {
  const dispatch = useDispatch();

  return (
    <EntityPicker
      apiGet={() => dispatch(fetchPurchaseRequests()).unwrap()}
      apiAdd={(data) => dispatch(savePurchaseRequest(data)).unwrap()} // create new request
      label="Purchase Request"
      {...props}
    />
  );
}