// src/pages/suppliers/SupplierCreate.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { createSupplier } from "../../../slices/purchases/supplierSlice";

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newSupplier = await dispatch(createSupplier(form)).unwrap();

            if (autoSelect) {
                dispatch(setSupplier(newSupplier));
                return navigate(-1);   // go back to picker screen
            }

            navigate("/suppliers");
        } catch (err) {
            console.error("Error creating supplier:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add Supplier</h2>

            <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Save</button>

                <button
                    type="button"
                    onClick={() => navigate("/suppliers")}
                    style={{ marginLeft: "10px" }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}