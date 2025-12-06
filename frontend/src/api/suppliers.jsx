import api from "./api"; // your axios instance

// Get all suppliers
export async function getSuppliers() {
    const res = await api.get("/suppliers");
    return res.data;
}

// Get a single supplier by ID
export async function getSupplier(id) {
    const res = await api.get(`/suppliers/${id}`);
    return res.data;
}

// Create a new supplier
export async function createSupplier(data) {
    const res = await api.post("/suppliers", data);
    return res.data;
}

// Update an existing supplier
export async function updateSupplier(id, data) {
    const res = await api.put(`/suppliers/${id}`, data);
    return res.data;
}

// Delete supplier (optional but useful)
export async function deleteSupplier(id) {
    const res = await api.delete(`/suppliers/${id}`);
    return res.data;
}