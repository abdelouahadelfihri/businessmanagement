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

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSupplier = await dispatch(addSupplierThunk(form)).unwrap();
      if (autoSelect) {
        dispatch(setSupplier(newSupplier));
        navigate(-1); // back to picker screen
      } else {
        navigate("/suppliers");
      }
    } catch (err) {
      console.error("Error creating supplier:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, padding: 20 }}>
      <h2>Add Supplier</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <div style={{ marginTop: 10 }}>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  );
}