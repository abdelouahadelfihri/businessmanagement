// src/pages/suppliers/SupplierCreate.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addSupplierThunk, setSupplier } from "../../../slices/purchases/supplierSlice";

export default function SupplierCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const autoSelect = new URLSearchParams(location.search).get("autoSelect") === "true";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",  // ⬅️ added field
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSupplier = await dispatch(addSupplierThunk(form)).unwrap();
    if (autoSelect) {
      dispatch(setSupplier(newSupplier));
      navigate(-1); // go back to previous screen
    } else {
      navigate("/suppliers");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, padding: 20 }}>
      <h2>Add Supplier</h2>

      <div style={{ marginBottom: 10 }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginLeft: 8 }}
      >
        Cancel
      </button>
    </form>
  );
}