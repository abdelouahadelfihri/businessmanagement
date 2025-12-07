import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------------------------------------------------
//  Async thunks
// ---------------------------------------------------
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async () => {
    const res = await axios.get("/api/suppliers");
    return res.data;
  }
);

export const addSupplierThunk = createAsyncThunk(
  "suppliers/addSupplier",
  async (payload) => {
    const res = await axios.post("/api/suppliers", payload);
    return res.data; // new supplier object
  }
);

// ---------------------------------------------------
//  Slice
// ---------------------------------------------------
const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    list: [],
    selectedSupplier: null, // used by SupplierPicker
    loading: false,
    error: null,
  },

  reducers: {
    // used when coming back from SupplierCreate with ?autoSelect=true
    setSupplier(state, action) {
      state.selectedSupplier = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // fetch suppliers
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load suppliers";
      })

      // add supplier
      .addCase(addSupplierThunk.fulfilled, (state, action) => {
        state.list.push(action.payload); // update list in memory
      });
  },
});

export const { setSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;