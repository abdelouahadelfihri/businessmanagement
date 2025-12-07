// src/components/pickers/SupplierPicker.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EntityPicker from "./EntityPicker";
import { fetchSuppliers, addSupplierThunk } from "../../slices/purchases/supplierSlice";

export default function SupplierPicker({ value, onChange }) {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers.list);

  return (
    <EntityPicker
      apiGet={() => dispatch(fetchSuppliers()).unwrap()}
      apiAdd={(data) => dispatch(addSupplierThunk(data)).unwrap()}
      label="Supplier"
      value={value}
      onChange={onChange}
    />
  );
}