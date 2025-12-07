// src/pages/suppliers/SupplierCreate.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createSupplier, setSupplier } from "../../../slices/purchases/supplierSlice";

export default function SupplierCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const autoSelect = new URLSearchParams(location.search).get("autoSelect") === "true";

  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSupplier = await dispatch(createSupplier(form)).unwrap();
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
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
    </form>
  );

}