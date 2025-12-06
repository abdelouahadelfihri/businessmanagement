// src/pages/suppliers/SupplierEdit.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSupplier, updateSupplier } from "../../api/suppliers";
import { suppliersSlice } from "../../store/purchases/suppliersSlice";

function SupplierEdit() {
    const { id } = useParams(); // supplier id from URL
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    // Load supplier data
    useEffect(() => {
        async function load() {
            try {
                const supplier = await getSupplier(id);
                setName(supplier.name);
            } catch (err) {
                console.error("Failed to load supplier", err);
            }
            setLoading(false);
        }
        load();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updated = await updateSupplier(id, { name });

        // Update in Redux store
        dispatch(suppliersSlice.actions.updateSupplier(updated));

        // Go back to suppliers list
        navigate("/suppliers");
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Edit Supplier</h2>

            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{
                        display: "block",
                        marginTop: "5px",
                        padding: "10px",
                        width: "300px"
                    }}
                />

                <button type="submit" style={{ marginTop: "20px" }}>
                    Update
                </button>
            </form>
        </div>
    );
}

export default SupplierEdit;