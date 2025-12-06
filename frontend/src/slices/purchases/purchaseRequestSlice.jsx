// src/store/purchaseRequestSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';   // axios instance

// Fetch list of purchase requests
export const fetchPurchaseRequests = createAsyncThunk(
  'pr/fetch',
  async () => {
    const res = await api.get('/purchase-requests');
    return res.data;
  }
);

// Create or update purchase request
export const savePurchaseRequest = createAsyncThunk(
  'pr/save',
  async (payload) => {
    if (payload.id) {
      // Update
      const res = await api.put(`/purchase-requests/${payload.id}`, payload);
      return res.data;
    } else {
      // Create
      const res = await api.post('/purchase-requests', payload);
      return res.data;
    }
  }
);

const purchaseRequestSlice = createSlice({
  name: 'purchaseRequest',
  initialState: {
    supplier: null,  // { id, name }
    form: { supplier_id: null, description: '', date: '', status: '' },
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

      // handles auto-select supplier when editing existing PR
      if (action.payload.supplier_id && action.payload.supplier_name) {
        state.supplier = {
          id: action.payload.supplier_id,
          name: action.payload.supplier_name
        };
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseRequests.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      .addCase(savePurchaseRequest.pending, (state) => {
        state.loading = true;
      })

      .addCase(savePurchaseRequest.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(savePurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSupplier, clearSupplier, setFormField, setForm } =
  purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;