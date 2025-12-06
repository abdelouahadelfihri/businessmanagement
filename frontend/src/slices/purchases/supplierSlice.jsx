// src/slices/purchases/supplierSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier } from "../../api/suppliers";

// Fetch all suppliers
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async () => {
    const res = await getSuppliers();
    return res;
  }
);

// Fetch a single supplier by ID
export const fetchSupplier = createAsyncThunk(
  "suppliers/fetchSupplier",
  async (id) => {
    const res = await getSupplier(id);
    return res;
  }
);

// Add a new supplier
export const addSupplierThunk = createAsyncThunk(
  "suppliers/addSupplier",
  async (data) => {
    const res = await createSupplier(data);
    return res;
  }
);

// Update a supplier
export const updateSupplierThunk = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, data }) => {
    const res = await updateSupplier(id, data);
    return res;
  }
);

// Delete a supplier
export const deleteSupplierThunk = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id) => {
    await deleteSupplier(id);
    return id; // return deleted id to remove from state
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSuppliers(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchSuppliers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSuppliers.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchSuppliers.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Fetch one (optional, updates list if needed)
      .addCase(fetchSupplier.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSupplier.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(s => s.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        else state.list.push(action.payload);
      })
      .addCase(fetchSupplier.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Add
      .addCase(addSupplierThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addSupplierThunk.fulfilled, (state, action) => { state.loading = false; state.list.push(action.payload); })
      .addCase(addSupplierThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Update
      .addCase(updateSupplierThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(s => s.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateSupplierThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Delete
      .addCase(deleteSupplierThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(s => s.id !== action.payload);
      })
      .addCase(deleteSupplierThunk.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { clearSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer;