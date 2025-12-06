// src/slices/purchases/purchaseOrderSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all purchase orders
export const fetchPurchaseOrders = createAsyncThunk(
  "purchaseOrders/fetchPurchaseOrders",
  async () => {
    const res = await fetch("/api/purchase-orders");
    if (!res.ok) throw new Error("Failed to fetch purchase orders");
    return res.json();
  }
);

// Create purchase order
export const createPurchaseOrder = createAsyncThunk(
  "purchaseOrders/createPurchaseOrder",
  async (data) => {
    const res = await fetch("/api/purchase-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create purchase order");
    return res.json();
  }
);

// Update purchase order
export const updatePurchaseOrder = createAsyncThunk(
  "purchaseOrders/updatePurchaseOrder",
  async ({ id, data }) => {
    const res = await fetch(`/api/purchase-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update purchase order");
    return res.json();
  }
);

const purchaseOrderSlice = createSlice({
  name: "purchaseOrders",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPurchaseOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPurchaseOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPurchaseOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updatePurchaseOrder.fulfilled, (state, action) => {
        const idx = state.list.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export default purchaseOrderSlice.reducer;