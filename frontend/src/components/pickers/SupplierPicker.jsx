// src/components/pickers/SupplierPicker.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import EntityPicker from "./EntityPicker";
import { useDispatch } from "react-redux";
import { fetchSuppliers, addSupplierThunk } from "../../slices/purchases/supplierSlice";

export default function SupplierPicker({ value, onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenList = () => {
    navigate("/suppliers?selectMode=true"); // navigate to supplier list in select mode
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <EntityPicker
        apiGet={() => dispatch(fetchSuppliers()).unwrap()}
        apiAdd={(data) => dispatch(addSupplierThunk(data)).unwrap()}
        label="Supplier"
        value={value}
        onChange={onChange}
      />

      <button type="button" onClick={handleOpenList}>
        Select Supplier
      </button>
    </div>
  );
}