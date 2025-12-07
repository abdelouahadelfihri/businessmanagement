// src/pages/suppliers/SupplierList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers, setSupplier } from "../../../slices/purchases/supplierSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function SupplierList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const autoSelect = new URLSearchParams(location.search).get("autoSelect") === "true";

  const { list, loading } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleSelect = (supplier) => {
    if (autoSelect) {
      dispatch(setSupplier(supplier));
      navigate(-1);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Suppliers</h2>
      <button onClick={() => navigate("/suppliers/create" + (autoSelect ? "?autoSelect=true" : ""))}>
        Add Supplier
      </button>

      {loading ? <p>Loading...</p> : (
        <ul>
          {list.map((s) => (
            <li key={s.id} style={{ margin: 6 }}>
              {s.name}{" "}
              {autoSelect ? (
                <button onClick={() => handleSelect(s)}>Select</button>
              ) : (
                <button onClick={() => navigate(`/suppliers/edit/${s.id}`)}>Edit</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}