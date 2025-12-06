// src/api/purchaseOrders.js
import api from './api';

// GET /purchase-orders
export async function getPurchaseOrders() {
    const res = await api.get('/purchase-orders');
    return res.data;
}

// GET one
export async function getPurchaseOrder(id) {
    const res = await api.get(`/purchase-orders/${id}`);
    return res.data;
}

// POST create
export async function createPurchaseOrder(data) {
    const res = await api.post('/purchase-orders', data);
    return res.data;
}

// PUT update
export async function updatePurchaseOrder(id, data) {
    const res = await api.put(`/purchase-orders/${id}`, data);
    return res.data;
}