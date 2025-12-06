// src/pages/suppliers/SupplierCreate.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { addSupplierThunk } from "../../../slices/purchases/supplierSlice";

export default function SupplierCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const autoSelect = query.get("autoSelect") === "true";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newSupplier = await dispatch(addSupplierThunk(form)).unwrap();

      if (autoSelect) {
        // Optional: dispatch some action to store selected supplier
        // dispatch(setSupplier(newSupplier));
        return navigate(-1); // go back to picker screen
      }

      navigate("/suppliers");
    } catch (err) {
      console.error("Error creating supplier:", err);
      setError(err.message || "Failed to create supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Supplier</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={() => navigate("/suppliers")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}