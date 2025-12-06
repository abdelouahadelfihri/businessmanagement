// src/components/pickers/SupplierPicker.jsx
import React from "react";
import EntityPicker from "./EntityPicker";
import { getSuppliers, createSupplier } from "../../api/suppliers";

export default function SupplierPicker(props) {
  return (
    <EntityPicker
      apiGet={getSuppliers}
      apiAdd={createSupplier}
      label="Supplier"
      {...props}
    />
  );
}