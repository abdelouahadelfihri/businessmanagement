// src/pages/suppliers/SupplierList.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchSuppliers } from "../../../slices/purchases/supplierSlice";
import { setSupplier } from "../../../slices/purchases/purchaseRequestSlice";

export default function SupplierList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const suppliers = useSelector((state) => state.suppliers.list);

    // Detect selection mode (from a picker)
    const query = new URLSearchParams(location.search);
    const selectMode = query.get("selectMode") === "true";

    useEffect(() => {
        dispatch(fetchSuppliers());
    }, [dispatch]);

    const handleSelect = (supplier) => {
        if (selectMode) {
            dispatch(setSupplier(supplier));
            navigate(-1); // return back to PurchaseRequestCreate or whatever screen opened the picker
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Suppliers</h2>

            <button onClick={() => navigate("/suppliers/create")}>
                Add Supplier
            </button>

            {/* If no suppliers, show message */}
            {suppliers.length === 0 ? (
                <p style={{ marginTop: "20px" }}>
                    No suppliers found. Please click "Add Supplier".
                </p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>ID</th>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Name</th>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Email</th>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Phone</th>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr
                                key={supplier.id}
                                onClick={() => selectMode && handleSelect(supplier)}
                                style={{
                                    cursor: selectMode ? "pointer" : "default",
                                    background: selectMode ? "#fafafa" : "none",
                                }}
                            >
                                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                    {supplier.id}
                                </td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                    {supplier.name}
                                </td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                    {supplier.email || "-"}
                                </td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                    {supplier.phone || "-"}
                                </td>

                                <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                    <button onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}