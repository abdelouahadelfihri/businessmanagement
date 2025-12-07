// src/slices/purchases/supplierSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // axios instance

// Fetch suppliers
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetch",
  async () => {
    const res = await api.get("/suppliers");
    return res.data;
  }
);

// Add supplier
export const addSupplierThunk = createAsyncThunk(
  "suppliers/add",
  async (payload) => {
    const res = await api.post("/suppliers", payload);
    return res.data;
  }
);

// Update supplier
export const updateSupplierThunk = createAsyncThunk(
  "suppliers/update",
  async ({ id, data }) => {
    const res = await api.put(`/suppliers/${id}`, data);
    return res.data;
  }
);

// Delete supplier
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
    loading: false,
    error: null,
    selected: null, // selected supplier for pickers
  },
  reducers: {
    setSupplier(state, action) {
      state.selected = action.payload;
    },
    clearSupplier(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSupplierThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSupplierThunk.fulfilled, (state, action) => {
        const idx = state.list.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteSupplierThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export const { setSupplier, clearSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;