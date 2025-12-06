// src/components/pickers/SupplierPicker.jsx
import React from "react";
import { useDispatch } from "react-redux";
import EntityPicker from "./EntityPicker";
import { fetchSuppliers, addSupplierThunk } from "../../slices/purchases/supplierSlice";

export default function SupplierPicker(props) {
  const dispatch = useDispatch();

  return (
    <EntityPicker
      apiGet={() => dispatch(fetchSuppliers()).unwrap()}
      apiAdd={(data) => dispatch(addSupplierThunk(data)).unwrap()}
      label="Supplier"
      {...props}
    />
  );
}