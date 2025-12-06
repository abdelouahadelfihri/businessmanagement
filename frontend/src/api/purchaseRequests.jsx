// src/api/purchaseRequests.js
import api from './api';

export async function getPurchaseRequest(id) {
    const response = await api.get(`/purchase-requests/${id}`);
    return response.data;
}

export async function createPurchaseRequest(data) {
    const response = await api.post('/purchase-requests', data);
    return response.data;
}

export async function updatePurchaseRequest(id, data) {
    const response = await api.put(`/purchase-requests/${id}`, data);
    return response.data;
}