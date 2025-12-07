import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addSupplierThunk, setSupplier } from "../../../slices/purchases/supplierSlice";

export default function SupplierCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // read ?autoSelect=true if coming from the picker
  const autoSelect =
    new URLSearchParams(location.search).get("autoSelect") === "true";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSupplier = await dispatch(addSupplierThunk(form)).unwrap();

    // if coming from SupplierPicker
    if (autoSelect) {
      dispatch(setSupplier(newSupplier)); // store selected supplier
      navigate(-1); // go back to supplier picker page
    } else {
      navigate("/suppliers");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Add Supplier</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
}