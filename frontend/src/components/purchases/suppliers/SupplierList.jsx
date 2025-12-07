// src/pages/suppliers/SupplierList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSuppliers, deleteSupplierThunk } from "../../../slices/purchases/supplierSlice";
import { useNavigate } from "react-router-dom";

export default function SupplierList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Suppliers</h2>
      <button onClick={() => navigate("/suppliers/add")}>Add Supplier</button>

      {loading && <p>Loading...</p>}

      <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.address}</td>
              <td>
                <button onClick={() => navigate(`/suppliers/edit/${s.id}`)}>Edit</button>
                <button onClick={() => dispatch(deleteSupplierThunk(s.id))} style={{ marginLeft: 5 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}