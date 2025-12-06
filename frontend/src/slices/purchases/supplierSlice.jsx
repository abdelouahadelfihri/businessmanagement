import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';   // your axios instance

// fetch list
export const fetchSuppliers = createAsyncThunk('suppliers/fetch', async () => {
  const res = await api.get('/suppliers');
  return res.data;
});

// add supplier
export const createSupplier = createAsyncThunk('suppliers/add', async (payload) => {
  const res = await api.post('/suppliers', payload);
  return res.data;
});

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default supplierSlice.reducer;