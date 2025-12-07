// src/pages/suppliers/SupplierList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSuppliers, setSupplier } from "../../../slices/purchases/supplierSlice";

export default function SupplierList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const suppliers = useSelector((state) => state.suppliers.list);
  const selectMode = new URLSearchParams(location.search).get("selectMode") === "true";

  useEffect(() => {
    if (!suppliers.length) dispatch(fetchSuppliers());
  }, [dispatch, suppliers.length]);

  const handleSelect = (supplier) => {
    if (selectMode) {
      dispatch(setSupplier(supplier));
      navigate(-1); // go back to previous screen
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Suppliers</h2>
      <button onClick={() => navigate("/suppliers/create?autoSelect=true")}>
        Add Supplier
      </button>

      <table style={{ width: "100%", marginTop: 16 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {selectMode && <th>Select</th>}
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              {selectMode && (
                <td>
                  <button onClick={() => handleSelect(s)}>Select</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}