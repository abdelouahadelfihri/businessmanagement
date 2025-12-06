// src/slices/purchases/receiptSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReceipts = createAsyncThunk("receipts/fetchReceipts", async () => {
  const res = await fetch("/api/receipts");
  if (!res.ok) throw new Error("Failed to fetch receipts");
  return res.json();
});

export const addReceipt = createAsyncThunk("receipts/addReceipt", async (data) => {
  const res = await fetch("/api/receipts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create receipt");
  return res.json();
});

export const updateReceipt = createAsyncThunk("receipts/updateReceipt", async ({ id, data }) => {
  const res = await fetch(`/api/receipts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update receipt");
  return res.json();
});

const receiptSlice = createSlice({
  name: "receipts",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceipts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(addReceipt.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateReceipt.fulfilled, (state, action) => {
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export default receiptSlice.reducer;