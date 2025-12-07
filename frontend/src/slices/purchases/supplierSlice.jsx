// src/slices/purchases/supplierSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // axios instance with baseURL

// Fetch all suppliers
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async () => {
    const res = await api.get("/suppliers");
    return res.data;
  }
);

// Create a new supplier
export const addSupplierThunk = createAsyncThunk(
  "suppliers/add",
  async (payload) => {
    const res = await api.post("/suppliers", payload);
    return res.data;
  }
);

// Update a supplier
export const updateSupplierThunk = createAsyncThunk(
  "suppliers/update",
  async ({ id, data }) => {
    const res = await api.put(`/suppliers/${id}`, data);
    return res.data;
  }
);

// Delete a supplier
export const deleteSupplierThunk = createAsyncThunk(
  "suppliers/delete",
  async (id) => {
    await api.delete(`/suppliers/${id}`);
    return id;
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    list: [],
    selectedSupplier: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSupplier(state, action) {
      state.selectedSupplier = action.payload;
    },
    clearSelectedSupplier(state) {
      state.selectedSupplier = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addSupplierThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateSupplierThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteSupplierThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export const { setSupplier, clearSelectedSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;