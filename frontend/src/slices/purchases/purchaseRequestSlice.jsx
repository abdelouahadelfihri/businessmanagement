// src/store/purchaseRequestSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // axios instance

// ----------------- ASYNC THUNKS -----------------

// Fetch all purchase requests
export const fetchPurchaseRequests = createAsyncThunk(
  "purchaseRequest/fetchAll",
  async () => {
    const res = await api.get("/purchase-requests");
    return res.data;
  }
);

// Fetch a single purchase request by ID
export const fetchPurchaseRequest = createAsyncThunk(
  "purchaseRequest/fetchOne",
  async (id) => {
    const res = await api.get(`/purchase-requests/${id}`);
    return res.data;
  }
);

// Create a new purchase request
export const createPurchaseRequest = createAsyncThunk(
  "purchaseRequest/create",
  async (data) => {
    const res = await api.post("/purchase-requests", data);
    return res.data;
  }
);

// Update an existing purchase request
export const updatePurchaseRequest = createAsyncThunk(
  "purchaseRequest/update",
  async ({ id, data }) => {
    const res = await api.put(`/purchase-requests/${id}`, data);
    return res.data;
  }
);

// Delete a purchase request
export const deletePurchaseRequest = createAsyncThunk(
  "purchaseRequest/delete",
  async (id) => {
    await api.delete(`/purchase-requests/${id}`);
    return id; // return the deleted id to remove from state
  }
);

// ----------------- SLICE -----------------
const purchaseRequestSlice = createSlice({
  name: "purchaseRequest",
  initialState: {
    supplier: null, // { id, name }
    form: { supplier_id: null, description: "", date: "", status: "" },
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSupplier(state, action) {
      state.supplier = action.payload;
      state.form.supplier_id = action.payload ? action.payload.id : null;
    },
    clearSupplier(state) {
      state.supplier = null;
      state.form.supplier_id = null;
    },
    setFormField(state, action) {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    setForm(state, action) {
      state.form = { ...state.form, ...action.payload };
      // auto-select supplier when editing existing PR
      if (action.payload.supplier_id && action.payload.supplier_name) {
        state.supplier = {
          id: action.payload.supplier_id,
          name: action.payload.supplier_name,
        };
      }
    },
    clearForm(state) {
      state.form = { supplier_id: null, description: "", date: "", status: "" };
      state.supplier = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchPurchaseRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseRequests.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPurchaseRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH ONE
      .addCase(fetchPurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseRequest.fulfilled, (state, action) => {
        state.form = action.payload;
        // auto-select supplier if present
        if (action.payload.supplier_id && action.payload.supplier_name) {
          state.supplier = {
            id: action.payload.supplier_id,
            name: action.payload.supplier_name,
          };
        }
        state.loading = false;
      })
      .addCase(fetchPurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createPurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPurchaseRequest.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(createPurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updatePurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePurchaseRequest.fulfilled, (state, action) => {
        const idx = state.list.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.loading = false;
      })
      .addCase(updatePurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deletePurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePurchaseRequest.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSupplier,
  clearSupplier,
  setFormField,
  setForm,
  clearForm,
} = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;